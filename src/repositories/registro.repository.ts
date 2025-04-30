import { AbstractRepository } from "../utils/abstract.repository";

export interface Registro {
  registro_id: number;
  user_id: number;
  data: string;
  created_at: Date;
}

export class RegistrosRepository extends AbstractRepository<Registro> {
  async setup() {

  }

  async findAll() {

  }
}