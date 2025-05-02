import { Router } from "express";
import { UserRepository } from "../../repositories/user.repository";
import { permittedParams } from "../../utils/other.utils";
import { CreateUserDto } from "./user.dto";

const router = Router();
const userRepository = new UserRepository();

router.get('/', async (req, res) => {
  const { take, skip } = req.body;
  if (!take && !skip) {
    throw new Error('You must provide the following parameters: take, skip');
  }

  const pagination = {
    take: Number(take) || 10,
    skip: Number(skip) || 0,
  };

  res.send(await userRepository.findAll(pagination));
})

router.post('/', async (req, res) => {
  const body = permittedParams<CreateUserDto>(req.body, ['given_name', 'family_name', 'email', 'password']);

  await userRepository.create(body)

  res.redirect('/dashboard');
})

export const UserController = router;