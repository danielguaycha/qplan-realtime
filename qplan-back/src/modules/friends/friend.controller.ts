import {Request, Response} from 'express';
import {BaseController} from '../../core';
import {Friend} from './friend.model';

class FriendController extends BaseController {
    constructor() {
        super();
    }

    async findAll(res: Response) {
        const data = await Friend.findAll({ order: [['id', 'ASC']]});
        return this.data(res, data);
    
    }

    async findOne(req: Request, res: Response) {
        const {id} = req.params;
        const data = await Friend.findByPk(id);
        return this.data(res, data);
    }

    async update(req: Request, res: Response) {
        const {name, gender} = req.body;
        const {id} = req.params;

        if (name.trim().length <= 1) {
            return this.err(res, 'El nombre es requerido y debe contener al menos 2 caracteres');
        }

        if (!['M', 'F'].includes(gender)) {
            return this.err(res, 'El genero debe ser F o M');
        }

        const friend = await Friend.findOne({where: {id}});
        if (!friend) return this.err(res, 'No se ha encuentra el amigo');

        friend.update({name, gender}).then(p => {
            return this.data(res, p);
        }).catch(err => {
            console.log('Error on Update Friend:: ', err);
            return this.err(res, `No se ha podido actualizar el amigo de ${name}`);
        });
    }
}

export default new FriendController();
