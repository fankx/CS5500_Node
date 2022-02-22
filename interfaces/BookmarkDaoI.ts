import Bookmark from '../models/bookmarks/Bookmark';

/**
 * @file Declares API for Bookmark related data access object methods
 */
export default interface BookmarkDaoI {
  userBookmarksTuit(uid: string, tid: string): Promise<Bookmark>;
  userUnbookmarksTuit(uid: string, tid: string): Promise<any>;
  findAllUsersBookmarks(uid: string): Promise<Bookmark[]>;
  findAllUsersThatBookmarkedTuit(tid: string): Promise<Bookmark[]>;
  deleteAllUsersBookmarks(uid: string): Promise<any>;
}
