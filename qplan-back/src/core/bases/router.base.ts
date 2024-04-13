import {Router} from 'express';

export abstract class RouterBase {
    router: Router;
    public name: string;

    protected constructor(name: string) {
        this.router = Router();
        this.name = name;
        this.routes();
    }

    abstract routes(): void;
}
