import { Router } from "express";
import { UserRepository } from "../../repositories/user.repository";
import type { User } from "../../repositories/user.repository";

const router = Router();
const user = new UserRepository();

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
  const { items } = req.body;

  if (!items || !Array.isArray(items)) {
    throw new Error('You must provide the following parameters: items, of type User[]');
  }

  await user.create(items);
  res.status(201).send({
    message: 'Users created successfully',
    users: items,
  })
})

export const UserModule = router;