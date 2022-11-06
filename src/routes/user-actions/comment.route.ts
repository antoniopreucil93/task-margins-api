import { Request, Response } from 'express';

import { commentCreateValidator } from '../../validators';
import { Class, Sport, User, UserAction } from '../../models';
import { UserActionService } from '../../services/user-actions.service';
import { UserActionEntity } from '../../database/entities/user-actions.entity';
import { classRepository } from '../../database/repositories/classes.repository';
import datasource from '../../database/datasource';
import { userRepository } from '../../database/repositories/user.repository';

const userActionService: UserActionService = new UserActionService();

export async function createComment(req: Request, res: Response): Promise<Response> {
    const { error, value } = commentCreateValidator.validate({
        comment: req.body.comment,
        classId: req.body.classId,
    });

    if (error) {
        return res.status(400).send(error);
    }

    const userId: number = +req['userId'];

    try {
        const sportClass: Class = await classRepository.findClassById(value.classId);

        if (!sportClass) {
            return res.status(404).json('Sport class not found!');
        }

        const user: User = await userRepository.findUserById(userId);

        if (!user) {
            return res.status(404).json('User not found!');
        }

        let newUserAction: UserAction = userActionService.createComment(sportClass, value.comment);

        newUserAction = await datasource.getRepository(UserActionEntity).save(newUserAction);

        return res.json(newUserAction).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
