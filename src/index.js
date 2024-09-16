import 'dotenv/config';
import './database/connectdb.js';
import express from 'express';
import authRouter from './routes/authRoute.js';
import linkRoute from './routes/linkRoute.js';
import redirectRoute from "./routes/redirectRoute.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import esm from 'esm';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// const __dirname = path.resolve();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]

app.use(cors({
    origin: function (origin, callback) {
        // console.log(origin);
        if (!origin || whiteList.includes(origin)) {
            return callback(null, origin);
        }
        else {
            return callback(new Error(`Error de CORS origin: ${origin} No autorizado!`));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/nano', redirectRoute);
app.use('/api', authRouter);
app.use('/links', linkRoute)

// Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`http://localhost:${port}`));
