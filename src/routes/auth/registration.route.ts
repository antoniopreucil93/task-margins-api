import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import datasource from '../../database/datasource';

import { registeralidator } from '../../validators';
import { UserEntity } from '../../database/entities/user.entity';
import { User } from '../../models';
import { UserService } from '../../services/user.service';

const userService = new UserService();

export async function register(req: Request, res: Response): Promise<Response> {
    const { error, value } = registeralidator.validate({
        username: req.body.username,
        password: req.body.password,
        ageLevel: req.body.ageLevel,
        role: req.body.role,
    });
    if (error) {
        return res.status(400).send(error.message);
    }

    try {
        const newUserForStore: User = userService.createUser(
            value.username,
            value.password,
            value.ageLevel,
            value.role
        );

        const newUser: UserEntity = await datasource
            .getRepository(UserEntity)
            .save(newUserForStore);

        const userJwtToken: string = jwt.sign(
            { userId: newUser.id, userRole: newUser.role },
            process.env.JWT_SECRET,
            {
                expiresIn: 8640,
            }
        );

        return res.json({ ...newUser, token: userJwtToken }).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
