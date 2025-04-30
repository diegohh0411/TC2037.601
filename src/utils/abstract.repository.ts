import { databaseManager } from "./database.manager";

export abstract class AbstractRepository<T> {
  constructor() {
    this.setup();
  }

  db = databaseManager;

  abstract setup(): void;

  abstract create(items: any[]): Promise<T[]>;

  /**
   * Should find all rows in the database of a specific table. The pagination object should contain the following properties: 'take' which is the number of rows to return, and 'skip' which is the number of rows to ignore before returning the results.
   */
  abstract findAll(pagination: { take: number, skip: number }): Promise<T[]>;
}