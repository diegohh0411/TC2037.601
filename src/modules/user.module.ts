import { Router } from "express";
import { User } from "../entities/user.entity";

const router = Router();
const user = new User();

router.get('/', async (req, res) => {
  const { take, skip } = req.body;
  if (!take && !skip) {
    throw new Error('You must provide the following parameters: take, skip');
  }

  const pagination = {
    take: Number(take) || 10,
    skip: Number(skip) || 0,
  };

  res.send(await user.findAll(pagination));
})

router.post('/', async (req, res) => {
  // TO-DO!
})

export const UserModule = router;