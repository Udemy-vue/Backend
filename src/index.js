import 'dotenv/config';
import './database/connectdb.js';
import express from 'express';
import authRouter from './routes/authRoute.js'

// middleware
const app = express();

app.get('/', (req, res) => {
	res.json({ api: true });
});

// middleware
app.use(express.json());
app.use('/api', authRouter);

const port = process.env.PORT || 5000
app.listen(port, () => console.log('http://localhost:' + port));