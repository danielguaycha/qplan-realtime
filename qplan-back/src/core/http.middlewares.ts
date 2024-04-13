import express from 'express';
import cors from 'cors';

export default [
    express.json(),
    express.urlencoded({extended: true}), // replace body parser
    cors(), // for http clients
];
