import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';

import datasource from '../../database/datasource';

import { loginValidator } from '../../validators';
import { UserEntity } from '../../database/entities/user.entity';
import { User } from '../../models';

export async function login(req: Request, res: Response): Promise<Response> {
    const { error, value } = loginValidator.validate({
        username: req.body.username,
        password: req.body.password,
    });

    if (error) {
        return res.status(400).send(error.message);
    }

    try {
        const user: User = await datasource.getRepository(UserEntity).findOne({
            where: {
                username: value.username,
            },
        });

        if (!user) {
            return res.status(404).send('User not found.');
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: 'User not verified.' });
        }

        if (!(await compare(value.password, user.password))) {
            return res.status(404).send('Incorrect credentials.');
        }

        const userJwtToken: string = jwt.sign(
            { userId: user.id, userRole: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: 8640,
            }
        );
        return res.json({ token: userJwtToken, userId: user.id }).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
