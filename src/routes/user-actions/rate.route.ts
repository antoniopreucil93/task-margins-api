import { Request, Response } from 'express';

import datasource from '../../database/datasource';

import { rateCreateValidator } from '../../validators';
import { Class, User, UserAction } from '../../models';
import { UserActionService } from '../../services/user-actions.service';
import { UserActionEntity } from '../../database/entities/user-actions.entity';
import { ClassEntity } from '../../database/entities/class.entity';
import { userRepository } from '../../database/repositories/user.repository';
import { classRepository } from '../../database/repositories/classes.repository';
import { userActionRepository } from '../../database/repositories/user-action.repository';

const userActionService: UserActionService = new UserActionService();

export async function createRate(req: Request, res: Response): Promise<Response> {
    const { error, value } = rateCreateValidator.validate({
        rate: req.body.rate,
        classId: req.body.classId,
    });

    if (error) {
        return res.status(400).send(error);
    }

    try {
        const sportClass: Class = await classRepository.findClassById(value.classId);

        if (!sportClass) {
            return res.status(404).json('Sport class not found!');
        }

        const userId: number = +req['userId'];
        const user: User = await userRepository.findUserById(userId);

        if (!user) {
            return res.status(404).json('User not found!');
        }

        const classUserActions: UserAction[] = await userActionRepository.getUserRatingsForClass(
            sportClass.id
        );

        let newUserAction: UserAction = userActionService.createRate(sportClass, value.rate);

        newUserAction = await datasource.transaction<UserAction>(async (trx) => {
            newUserAction = await trx.getRepository(UserActionEntity).save(newUserAction);

            classUserActions.push(newUserAction);

            const avgRatingForClass: number =
                userActionService.calcAvgRatingBasedOnUserRates(classUserActions);

            await trx.getRepository(ClassEntity).save({
                ...sportClass,
                rating: avgRatingForClass,
            });

            return newUserAction;
        });

        return res.json(newUserAction).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
