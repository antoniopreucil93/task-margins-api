import { hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import datasource from '../../database/datasource';

import { UserEntity } from '../../database/entities/user.entity';
import { User } from '../../models';
import { UserService } from '../../services/user.service';
import { userUpdateValidator } from '../../validators/user.validator';

const userService = new UserService();

export async function updateUser(req: Request, res: Response): Promise<Response> {
    const { error, value } = userUpdateValidator.validate({
        username: req.body.username,
        password: req.body.password,
        ageLevel: req.body.ageLevel,
        role: req.body.role,
    });
    if (error) {
        return res.status(400).send(error.message);
    }

    try {
        const userId: number = +req.params['userId'];

        const user: User = await datasource.getRepository(UserEntity).findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json('User not found!');
        }

        const updatedUser: UserEntity = await datasource.getRepository(UserEntity).save({
            ...user,
            username: value.username ? value.username : user.username,
            password: value.password ? hashSync(value.password, 10) : user.password,
            ageLevel: value.ageLevel ? value.ageLevel : user.ageLevel,
            role: value.role ? value.role : user.role,
        });

        return res.json(updatedUser).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
