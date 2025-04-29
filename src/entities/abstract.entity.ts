import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { connection } from "../database.manager";

export abstract class AbstractEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  db: Connection;

  constructor() {
    this.id = crypto.randomUUID();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.db = connection;
  }

  abstract setup(): void;
}