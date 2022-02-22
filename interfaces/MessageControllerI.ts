/**
 * @file the interface of the messageController
 */
import { Request, Response } from 'express';

export default interface MessageControllerI {
  userMessagesUser(req: Request, res: Response): void;
  findAllSentMessages(req: Request, res: Response): void;
  findAllReceivedMessages(req: Request, res: Response): void;
  deleteMessage(req: Request, res: Response): void;
  findMessageById(req: Request, res: Response): void;
  deleteAllSentMessages(req: Request, res: Response): void;
}
