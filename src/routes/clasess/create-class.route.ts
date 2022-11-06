import { Request, Response } from 'express';

import { SportEntity } from '../../database/entities/sport.entity';
import { Sport } from '../../models';
import { ClassEntity } from '../../database/entities/class.entity';
import { Class } from '../../models/class.model';
import { ClassService } from '../../services/class.service';
import { classCreateValidator } from '../../validators';
import datasource from '../../database/datasource';

const classService: ClassService = new ClassService();

export async function createClass(req: Request, res: Response): Promise<Response> {
    const { error, value } = classCreateValidator.validate({
        ageLevel: req.body.ageLevel,
        weekSchedule: req.body.weekSchedule,
        maxNumberOfParticipants: req.body.maxNumberOfParticipants,
        sportId: req.body.sportId,
    });

    if (error) {
        return res.status(400).send(error.message);
    }

    try {
        const sport: Sport = await datasource.getRepository(SportEntity).findOne({
            where: {
                id: value.sportId,
            },
        });

        if (!sport) {
            return res.status(404).json('Sport not found!');
        }

        let newClass: Class = classService.createClass(
            value.ageLevel,
            value.weekSchedule,
            value.totalNumberOfParticipants,
            sport
        );

        newClass = await datasource.getRepository(ClassEntity).save(newClass);

        return res.json(newClass).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
