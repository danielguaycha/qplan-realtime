import {Request, Response} from 'express';
import {RouterBase} from '../../core';
import FriendController from './friend.controller';

export default class FriendRouting extends RouterBase {
    constructor() {
        super('');
    }

    routes(): void {
        this.router.get('', (req: Request, res: Response) => FriendController.findAll(res));
        this.router.get('/:id', (req: Request, res: Response) => FriendController.findOne(req, res));
        this.router.put('/:id', (req: Request, res: Response) => FriendController.update(req, res));
    }
}
