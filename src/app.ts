import * as dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';

const swaggerDocument = require('../swagger.json');

// database custom imports
import Database from './database/database';

import routes from './routes';
import datasource from './database/datasource';

export async function createApp(): Promise<express.Express> {
    const app: express.Express = express();

    const database = new Database(datasource);
    await database.initialize();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/api', routes());

    return app;
}
