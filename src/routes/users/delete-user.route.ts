import { Request, Response } from 'express';

import datasource from '../../database/datasource';

import { UserEntity } from '../../database/entities/user.entity';
import { User } from '../../models';
import { UserService } from '../../services/user.service';
import { userRepository } from '../../database/repositories/user.repository';

const userService = new UserService();

export async function deleteUser(req: Request, res: Response): Promise<Response> {
    const userId: number = +req.params['userId'];

    try {
        const user: User = await userRepository.findUserById(userId);

        if (!user) {
            return res.status(404).json('User not found!');
        }

        await datasource.getRepository(UserEntity).remove(user);

        return res.json({ message: 'User deleted.' }).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
