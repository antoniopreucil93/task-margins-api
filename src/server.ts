import express from 'express';
import { createApp } from './app';

(async function () {
    const NODE_PORT: string = process.env.NODE_PORT;

    const app: express.Express = await createApp();

    app.listen(NODE_PORT, () => {
        console.log('server listening on PORT:', NODE_PORT);
    });
})();
