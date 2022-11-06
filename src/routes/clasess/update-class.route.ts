import { Request, Response } from 'express';

import datasource from '../../database/datasource';

import { SportEntity } from '../../database/entities/sport.entity';
import { Sport } from '../../models';
import { ClassEntity } from '../../database/entities/class.entity';
import { Class } from '../../models/class.model';
import { classCreateValidator } from '../../validators';
import { classRepository } from '../../database/repositories/classes.repository';

export async function updateClass(req: Request, res: Response): Promise<Response> {
    const { error, value } = classCreateValidator.validate({
        ageLevel: req.body.ageLevel,
        weekSchedule: req.body.weekSchedule,
        maxNumberOfParticipants: req.body.maxNumberOfParticipants,
        sportId: req.body.sportId,
    });

    if (error) {
        return res.status(400).send(error);
    }

    try {
        const classId: number = +req.params['classId'];

        const sportClassForUpdate: Class = await classRepository.findClassById(classId);

        if (!sportClassForUpdate) {
            return res.status(404).json('Class not found!');
        }

        const sport: Sport = await datasource.getRepository(SportEntity).findOne({
            where: {
                id: value.sportId,
            },
        });

        if (!sport) {
            return res.status(404).json('Sport not found!');
        }

        const updatedClass = await datasource.getRepository(ClassEntity).save({
            ...sportClassForUpdate,
            ageLevel: value.ageLevel ? value.ageLevel : sportClassForUpdate.ageLevel,
            weekSchedule: value.weekSchedule
                ? value.weekSchedule
                : sportClassForUpdate.weekSchedule,
            maxNumberOfParticipants: value.maxNumberOfParticipants
                ? value.maxNumberOfParticipants
                : sportClassForUpdate.maxNumberOfParticipants,
            sport,
        });

        return res.json(updatedClass).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
