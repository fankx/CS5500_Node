/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import { Express, Request, Response } from 'express';
import BookmarkDao from '../daos/BookmarkDao';
import BookmarkControllerI from '../interfaces/BookmarkControllerI';

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST api/users/:uid/bookmarks/:tid to record that a user bookmarks a tuit
 *     </li>
 *     <li>DELETE api/users/:uid/bookmarks/:tid to record that a user no longer bookmarks a tuit</li>
 *     <li>GET api/users/:uid/bookmarks to retrieve all the tuits bookmarkd by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/bookmarks to retrieve all users that bookmarkd a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/bookmarks to record that a user no longer bookmarkd any tuits</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
 * @property {BookmarkController} BookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
  private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
  private static bookmarkController: BookmarkController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return TuitController
   */
  public static getInstance = (app: Express): BookmarkController => {
    if (BookmarkController.bookmarkController === null) {
      BookmarkController.bookmarkController = new BookmarkController();
      app.post(
        '/api/users/:uid/bookmarks/:tid',
        BookmarkController.bookmarkController.userBookmarksTuit
      );
      app.delete(
        '/api/users/:uid/bookmarks/:tid',
        BookmarkController.bookmarkController.userUnbookmarksTuit
      );
      app.get(
        '/api/users/:uid/bookmarks',
        BookmarkController.bookmarkController.findAllUsersBookmarks
      );
      app.get(
        '/api/tuits/:tid/bookmarks',
        BookmarkController.bookmarkController.findAllUsersThatBookmarkedTuit
      );
      app.delete(
        '/api/users/:uid/bookmarks',
        BookmarkController.bookmarkController.deleteAllUsersBookmarks
      );
    }
    return BookmarkController.bookmarkController;
  };

  private constructor() {}

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is bookmarking the tuit
   * and the tuit being bookmarkd
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new bookmarks that was inserted in the
   * database
   */
  userBookmarksTuit = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .userBookmarksTuit(req.params.uid, req.params.tid)
      .then((bookmarks) => res.json(bookmarks));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is unbookmarking the tuit
   * and the tuit being unbookmarkd
   * @param {Response} res Represents response to client, including status
   * on whether deleting a bookmark was successful or not
   */
  userUnbookmarksTuit = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .userUnbookmarksTuit(req.params.uid, req.params.tid)
      .then((status) => res.send(status));

  /**
   * Retrieves all tuits that bookmarkd by a certain user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user who bookmark those tuits
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the bookmark objects
   */
  findAllUsersBookmarks = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .findAllUsersBookmarks(req.params.uid)
      .then((bookmarks) => res.json(bookmarks));

  /**
   * Retrieves all users that bookmarkd a certain tuit from the database
   * @param {Request} req Represents request from client, including the path
   * parameter tid representing the tuit that is being bookmarkd
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the bookmark objects
   */
  findAllUsersThatBookmarkedTuit = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .findAllUsersThatBookmarkedTuit(req.params.tid)
      .then((users) => res.json(users));

  /**
   * Deletes all bookmarks of a certain user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user whose bookmarks are to be deleted
   * @param {Response} res Represents response to client, including status
   * on whether deleting bookmarks was successful or not
   */
  deleteAllUsersBookmarks = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .deleteAllUsersBookmarks(req.params.uid)
      .then((status) => res.send(status));
}
