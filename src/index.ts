import express from 'express';
import 'dotenv/config';

import { UserModule } from './modules/user.module';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => { res.send('Hello TypeScript!'); });

app.use('/user', UserModule);

app.listen(3000, () => console.log('✔️  API on http://localhost:3000'));
