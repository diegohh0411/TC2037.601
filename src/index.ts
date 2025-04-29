import express from 'express';
const app = express();

app.get('/', (_req, res) => { res.send('Hello TypeScript!'); });

app.listen(3000, () => console.log('✔️  API on http://localhost:3000'));
