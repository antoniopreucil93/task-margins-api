import { Request, Response } from 'express';
import { Class, User } from '../../models';

import datasource from '../../database/datasource';

import { ClassEntity } from '../../database/entities/class.entity';
import { ClassParticipatService } from '../../services/class-participants.service';
import { ClassParticipantEntity } from '../../database/entities/class-participants.entity';
import { applyOnClassValidator } from '../../validators/class-participant.validator';
import { ClassParticipatServiceValidator } from '../../services/class-participant.service-validator';
import { classParticipantsRepository } from '../../database/repositories/class-participant.repository';
import { userRepository } from '../../database/repositories/user.repository';

const classParticpantService: ClassParticipatService = new ClassParticipatService();
const classParticpantServiceValidator = new ClassParticipatServiceValidator();

async function resolveSportClass(classId: number): Promise<Class> {
    return datasource.getRepository(ClassEntity).findOne({
        where: {
            id: classId,
        },
    });
}

export async function applyOnClass(req: Request, res: Response): Promise<Response> {
    const { error, value } = applyOnClassValidator.validate({
        classId: req.body.classId,
    });

    if (error) {
        return res.status(400).send(error);
    }

    const userId: number = +req['userId'];

    try {
        const sportClass = await resolveSportClass(value.classId);
        if (!sportClass) return res.status(404).json('Sport class not found!');

        const user: User = await userRepository.findUserById(userId);
        if (!user) return res.status(404).json('Sport not found!');

        const totalNumberOfclassParticipants: number =
            await classParticipantsRepository.findTotalNumberOfUsersAppliedOnClass(sportClass.id);

        const userApplicationsTotal: number =
            await classParticipantsRepository.findTotalNumberOfUserApplicationsOnClasses(userId);

        let classApplicationValidatorResponse =
            classParticpantServiceValidator.validateUserApplication(
                totalNumberOfclassParticipants,
                userApplicationsTotal,
                sportClass,
                user
            );

        if (!classApplicationValidatorResponse.status) {
            return res.status(400).json(classApplicationValidatorResponse.error);
        }

        let newClassParticipant = classParticpantService.applyUserOnClass(sportClass, user);

        newClassParticipant = await datasource
            .getRepository(ClassParticipantEntity)
            .save(newClassParticipant);

        return res.json(newClassParticipant).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
