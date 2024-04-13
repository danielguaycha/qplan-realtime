import {Response} from 'express';

export abstract class HttpResponse {
    private successMessage = 'Solicitud procesada con éxito';

    ok(res: Response, message: string = this.successMessage) {
        return res.status(200).json({
            ok: true,
            message
        });
    }

    data(res: Response, data: unknown = null, message: string = this.successMessage) {
        return res.status(200).json({
            ok: true,
            message,
            data,
        });
    }

    err(res: Response, message: unknown, statusCode = 400) {
        return res.status(statusCode).json({
            ok: false,
            message
        });
    }
}
