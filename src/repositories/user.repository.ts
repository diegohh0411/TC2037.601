import { CreateUserDto } from "../modules/user/user.dto";
import { AbstractRepository } from "../utils/abstract.repository";
import bcrypt from "bcrypt";

export interface User {
  user_id: number;
  full_name: string;
  email: string;
  password_hash: string;
  phone: string;
  created_at: Date;
  last_login: Date | null;
}

export class UserRepository extends AbstractRepository<User> {
  async setup() {
    await this.db.query(`
      CREATE TABLE IF NOT EXISTS user (
          user_id          BIGINT       UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          full_name        VARCHAR(255)           NOT NULL,
          email            VARCHAR(255)           NOT NULL UNIQUE,
          password_hash    VARCHAR(255)           NOT NULL,
          phone            VARCHAR(50),
          created_at       TIMESTAMP              NOT NULL DEFAULT CURRENT_TIMESTAMP,
          last_login       TIMESTAMP              NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `)
  }

  private async hashPassword(password: string): Promise<string> {
    if (!password) {
      throw new Error('Password is required');
    }

    return bcrypt.hash(password, 10);
  }

  async create(items: CreateUserDto[]) {
    let query = `
      INSERT INTO user (full_name, email, password_hash, phone, created_at) VALUES `;

    for (const item of items) {
      const hashedPassword = await this.hashPassword(item.password);
      const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format to 'YYYY-MM-DD HH:MM:SS'

      query += ` ('${item.full_name}', '${item.email}', '${hashedPassword}', '${item.phone}', '${createdAt}'),`;
    }

    query = query.slice(0, -1); // Remove the last comma
    query += ';';

    const response = await this.db.query(query);
    return response as User[];
  }

  async findAll(pagination: { take: number, skip: number }) {
    const { take, skip } = pagination;

    const queryResult = await this.db.query(`
      SELECT * FROM user LIMIT ? OFFSET ?
    `, [take, skip]);

    return queryResult as User[];
  }

}