import { Request, Response } from 'express';

import datasource from '../../database/datasource';

import { UserEntity } from '../../database/entities/user.entity';
import { User } from '../../models';

export async function fetchManyUsers(req: Request, res: Response): Promise<Response> {
    try {
        const users: User[] = await datasource.getRepository(UserEntity).find({
            select: ['id', 'username', 'role', 'ageLevel'],
        });

        return res.json(users).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
