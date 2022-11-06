import { Request, Response } from 'express';

import { registeralidator } from '../../validators';
import { UserEntity } from '../../database/entities/user.entity';
import { User } from '../../models';
import { UserService } from '../../services/user.service';
import datasource from '../../database/datasource';

const userService = new UserService();

export async function deleteUser(req: Request, res: Response): Promise<Response> {
    const userId: number = +req.params['userId'];

    try {
        const user: User = await datasource.getRepository(UserEntity).findOne({
            select: ['id', 'username', 'role', 'ageLevel'],
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json('User not found!');
        }

        await datasource.getRepository(UserEntity).remove(user);

        return res.json({ message: 'User deleted.' }).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
