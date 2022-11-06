import { Request, Response } from 'express';

import datasource from '../../database/datasource';

import { ClassEntity } from '../../database/entities/class.entity';
import { Class } from '../../models/class.model';

export async function fetchOneClass(req: Request, res: Response): Promise<Response> {
    try {
        const classId: number = +req.params['classId'];

        const sportClass: Class = await datasource.getRepository(ClassEntity).findOne({
            select: ['id', 'weekSchedule', 'ageLevel', 'classDuration', 'maxNumberOfParticipants'],
            where: {
                id: classId,
            },
        });

        if (!sportClass) {
            return res.status(404).json('Class not found!');
        }

        return res.json(sportClass).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
