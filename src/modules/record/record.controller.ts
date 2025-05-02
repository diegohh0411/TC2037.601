import { Router } from "express";
import { RecordRepository } from "../../repositories/record.repository";
import { permittedParams } from "../../utils/other.utils";

const router = Router();
const recordRepository = new RecordRepository();

router.get("/", async (req, res) => {
  const params = permittedParams(req.body, ['take', 'skip']);

  const pagination = {
    take: Number(params.take),
    skip: Number(params.skip),
  };

  res.send(await recordRepository.findAll(pagination));
}
);

export const RecordController = router;