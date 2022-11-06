import { Request, Response } from 'express';
import { Adulthood } from 'src/enum';

import { classRepository } from '../../database/repositories/classes.repository';
import { Class } from '../../models/class.model';

export async function fetchClasses(req: Request, res: Response): Promise<Response> {
    try {
        const qs = req.query;

        const classes: Class[] = await classRepository.getClassesFilteredBySportAndAge(
            qs.sports,
            qs.age as Adulthood
        );

        return res.json(classes).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
