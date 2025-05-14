import { Router } from "express";
import { RecordRepository } from "../../repositories/record.repository";
import { permittedParams } from "../../utils/other.utils";

const router = Router();
export const recordRepository = new RecordRepository();

router.get("/", async (req, res) => {
  const params = permittedParams(req.body, ['take', 'skip']);

  const pagination = {
    take: Number(params.take),
    skip: Number(params.skip),
  };

  res.send(await recordRepository.findAll(pagination));
}
);

router.post("/", async (req, res) => {
  const params = permittedParams(req.body, ['tipoRegistro', 'estadoTiempo', 'estacion']);

  const newRecord = await recordRepository.create(params);

  res.status(201).send(newRecord);
});

router.post("/update", async (req, res) => {
  const params = permittedParams(req.body, ['record_id'], ['estado_tiempo']);

  console.log({ params })

  await recordRepository.update(params)

  res.redirect('/records');
}
);

export const RecordController = router;