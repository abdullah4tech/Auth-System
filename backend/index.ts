import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import routes from './router/authRouter';



const app = express();
const port: number = parseInt(process.env.PORT || '3000', 10);
const connString: string = process.env.MONGO_URI || '';

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(connString)
  .then(() => console.log('\nMongoDB Connected...'))
  .catch((error) => console.log('MongoDB connection error: ', error));

app.use('/api', routes);

app.listen(port, () => {
  console.log(`\nListening at endpoint: http://localhost:${port}/api`);
});
