/**
 * @file Server file
 */
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URI);
import bodyParser from 'body-parser';
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
const app = express();
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) =>
  res.send('This is the root of the server')
);

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
