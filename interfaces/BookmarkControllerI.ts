/**
 * @file the interface of the bookmarkController
 */
import { Request, Response } from 'express';

export default interface BookmarkControllerI {
  userBookmarksTuit(req: Request, res: Response): void;
  userUnbookmarksTuit(req: Request, res: Response): void;
  findAllUsersBookmarks(req: Request, res: Response): void;
  findAllUsersThatBookmarkedTuit(req: Request, res: Response): void;
  deleteAllUsersBookmarks(req: Request, res: Response): void;
}
