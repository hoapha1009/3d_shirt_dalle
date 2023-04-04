import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import dalleRoutes from './routes/dalle.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Hello from DALL.E!',
	});
});

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
