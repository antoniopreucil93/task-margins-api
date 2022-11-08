import { Request, Response } from 'express';

import { Class, ClassParticipants } from '../../models';

import datasource from '../../database/datasource';

import { ClassEntity } from '../../database/entities/class.entity';
import { ClassParticipantEntity } from '../../database/entities/class-participants.entity';
import { applyOnClassValidator } from '../../validators/class-participant.validator';
import { classParticipantsRepository } from '../../database/repositories/class-participant.repository';

async function resolveSportClass(classId: number): Promise<Class> {
    return datasource.getRepository(ClassEntity).findOne({
        where: {
            id: classId,
        },
    });
}

export async function signOutFromClass(req: Request, res: Response): Promise<Response> {
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

        const classParticipant: ClassParticipants =
            await classParticipantsRepository.findClassParticipantByClassAndUser(
                userId,
                sportClass.id
            );

        await datasource.getRepository(ClassParticipantEntity).remove(classParticipant);

        return res.json({ message: 'Class participant signed out.' }).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
