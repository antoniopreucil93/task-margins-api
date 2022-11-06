import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { migrations1667743342150 } from './migrations/1667743342150-migrations';

dotenv.config();

export default new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [__dirname + '/../**/*.entity{.js,.ts}'],
    migrations: [migrations1667743342150],
    synchronize: false,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
});
