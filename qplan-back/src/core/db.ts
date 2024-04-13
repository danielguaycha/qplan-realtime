import {Dialect} from 'sequelize';
import {Sequelize} from 'sequelize-typescript';
import dotenv from 'dotenv';
import {Friend} from '../modules/friends';

class DB {

    sequelize: Sequelize;

    constructor() {
        dotenv.config();
        this.sequelize = this.connect();
    }

    public connect() {
        let options = {};
        if (process.env.DB_SSL && process.env.DB_SSL === 'true') {
            options = {
                dialectOptions: {ssl: {require: true, rejectUnauthorized: false}}
            };
        }
        this.sequelize = new Sequelize(this.getDbUrl() || '', options);
        this.sequelize.authenticate().then(() => {
            console.log('Correctamente conectado a la DB');
        }).catch(err => console.log(err));
        this.models();
        return this.sequelize;
    }

    public models() {
        this.sequelize.addModels([Friend]);
    }

    getDriver(): Dialect {
        const driver = process.env.DB_DRIVER || '';
        if (!driver) return 'postgres';
        switch (driver.toLowerCase()) {
            case 'mysql' :
                return 'mysql';
            case 'pgsql' :
                return 'postgres';
            case 'mariadb' :
                return 'mariadb';
            case 'mssql' :
                return 'mssql';
        }
        return 'postgres';
    }

    getPort(): number {
        const port = process.env.DB_PORT;
        if (port) {
            return parseInt(port, 10);
        }
        return 5432;
    }

    getDbUrl(): string {
        return `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    }

}

const db = new DB();
export default db.sequelize;
