/**
 * @file Server file
 */
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TuitController from './controllers/TuitController';
import UserController from './controllers/UserController';
import LikeController from './controllers/LikeController';
import FollowController from './controllers/FollowController';
import BookmarkController from './controllers/BookmarkController';
import MessageController from './controllers/MessageController';

dotenv.config();
const app = express();
app.use(express.json());

const conn = mongoose.connect(process.env.MONGO_URI);
conn.then(() => console.log('Connected to MongoDB'));

app.get('/', (req: Request, res: Response) =>
  res.send('This is the root of the server')
);

const tuitController = TuitController.getInstance(app);
const userController = UserController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
