/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
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

// connect to the database
const conn = mongoose.connect(process.env.MONGO_URI);
conn.then(() => console.log('Connected to MongoDB'));

app.get('/', (req: Request, res: Response) =>
  res.send('This is the root of the server')
);

// create RESTful Web service API
const tuitController = TuitController.getInstance(app);
const userController = UserController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
