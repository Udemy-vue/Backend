import 'dotenv/config';
import './database/connectdb.js';
import express from 'express';
import authRouter from './routes/authRoute.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import esm from 'esm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use('/api', authRouter);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`http://localhost:${port}`));
