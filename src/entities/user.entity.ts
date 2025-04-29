import { AbstractEntity } from "./abstract.entity";

export class User extends AbstractEntity {
  setup() {
    this.db.query(`
      CREATE TABLE IF NOT EXISTS users (
        full_name VARCHAR(255) NOT NULL,
      );
    `)
  }
}