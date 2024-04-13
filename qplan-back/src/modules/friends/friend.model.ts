import {AfterSave, AfterUpdate, Column, DataType, Model, Table} from 'sequelize-typescript';
import WebsocketIo from '../../core/websocket';

@Table({
    timestamps: true,
    tableName: 'my_friends'
})
class Friend extends Model {

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    gender!: string;

    @AfterUpdate
    static updated(friend: Friend) {
        WebsocketIo.getInstance().emit('updated-friend', JSON.stringify({...friend.dataValues, previus: friend.previous()}));
    }
}

export {
    Friend
};
