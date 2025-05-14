import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { UserController } from './modules/user/user.controller';
import { HtmlController } from './modules/html/html.controller';
import { RecordController } from './modules/record/record.controller';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', HtmlController)

app.use('/api/user', UserController);
app.use('/api/record', RecordController);

app.listen(3000, () => console.log('✔️  API on http://localhost:3000'));