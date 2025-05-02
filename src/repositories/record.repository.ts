import { AbstractRepository } from "../utils/abstract.repository";

interface Record {
  record_id: number;
  user_id: number;
  biomo_id: number;
  project_id: number | null;
  tipo_registro: string;
  estado_tiempo: string;
  estacion: string;
  created_at: Date;
}

export interface UpdateRecordDto {
  record_id: number;
  user_id?: number;
  biomo_id?: number;
  project_id?: number | null;
  tipo_registro?: string;
  estado_tiempo?: string;
  estacion?: string;
}

export class RecordRepository extends AbstractRepository<Record> {
  async setup() {
    await this.db.query(`
      CREATE TABLE IF NOT EXISTS data_records (
        record_id        BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id          BIGINT UNSIGNED NOT NULL,
        biomo_id         BIGINT UNSIGNED NOT NULL,
        project_id       BIGINT UNSIGNED NULL,
        tipo_registro    ENUM('fauna_transecto','fauna_punto_conteo','fauna_busqueda_libre',
                              'validacion_cobertura','parcela_vegetacion',
                              'camaras_trampa','variables_climaticas') NOT NULL,
        estado_tiempo    ENUM('soleado','parcialmente_nublado','lluvioso') NOT NULL,
        estacion         ENUM('verano_seco','invierno_lluviosa')           NOT NULL,
        created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
  }

  async create(item: any) {
    return { note: "To do!" } as unknown as Record;
  }

  async update(item: UpdateRecordDto) {
    const { record_id, ...rest } = item;
    const queryResult = await this.db.query(`
      UPDATE data_records SET ? WHERE record_id = ?
    `, [rest, record_id]);

    return queryResult as unknown as Record;
  }

  async findAll(pagination: { take: number, skip: number }) {
    const { take, skip } = pagination;

    const queryResult = await this.db.query(`
        SELECT * FROM data_records LIMIT ? OFFSET ?
      `, [take, skip]);

    return queryResult as Record[];
  }
}