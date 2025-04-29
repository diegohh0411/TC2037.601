import { AbstractEntity } from "./abstract.entity";

interface UserProps {
  user_id: string;
}

export class User extends AbstractEntity<UserProps> {
  setup() {
    this.db.query(`
      CREATE TABLE IF NOT EXISTS users (
        full_name VARCHAR(255) NOT NULL,
      );
    `)
  }

  async findAll(pagination: { take: number, skip: number }) {
    const { take, skip } = pagination;

    const queryResult = await this.db.query(`
      SELECT * FROM user LIMIT ? OFFSET ?
    `, [take, skip]);

    return queryResult as UserProps[];
  }

}