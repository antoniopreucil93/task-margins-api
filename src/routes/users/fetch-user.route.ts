import { Request, Response } from 'express';
import datasource from '../../database/datasource';
import { UserEntity } from '../../database/entities/user.entity';
import { User } from '../../models';

export async function fetchUser(req: Request, res: Response): Promise<Response> {
    const userId: number = +req.params['userId'];

    try {
        const user: User = await datasource.getRepository(UserEntity).findOne({
            select: ['id', 'username', 'role', 'ageLevel'],
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json('Sport not found!');
        }

        return res.json(user).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
