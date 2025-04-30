import express from 'express';
import 'dotenv/config';

import { UserController } from './modules/user/user.controller';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => { res.send('Hello TypeScript!'); });

app.use('/user', UserController);

app.listen(3000, () => console.log('✔️  API on http://localhost:3000'));