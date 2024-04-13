const dotenv = require('dotenv');
dotenv.config();

let dialectOptions = { bigNumberStrings: true };

if (process.env.DATABASE_SSL && process.env.DATABASE_SSL === 'true') {
    dialectOptions = {
        ...dialectOptions,
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    };
}

const dbUrl = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;;

module.exports = {
    development: {
        url: dbUrl || '',
        dialectOptions: dialectOptions
    },
    test: {
        url: dbUrl || '',
        dialectOptions: dialectOptions
    },
    production: {
        url: dbUrl || '',
        dialectOptions: dialectOptions
    }
};
