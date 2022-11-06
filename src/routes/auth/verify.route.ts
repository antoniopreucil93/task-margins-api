import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import datasource from '../../database/datasource';

import { UserEntity } from '../../database/entities/user.entity';
import { User } from '../../models';

function verify(token: string) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}

export async function verifyUser(req: Request, res: Response): Promise<Response> {
    const token: string = req.query.tkn as string;

    if (!token) {
        return res.status(404).json('Token not found!');
    }

    const tokenPayload = await verify(token);

    try {
        const user: User = await datasource.getRepository(UserEntity).findOne({
            where: {
                id: tokenPayload['userId'],
            },
        });

        if (!user) {
            return res.status(404).json('User not found!');
        }

        await datasource.getRepository(UserEntity).save({
            ...user,
            isVerified: true,
        });

        return res.json({ message: 'success' }).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
