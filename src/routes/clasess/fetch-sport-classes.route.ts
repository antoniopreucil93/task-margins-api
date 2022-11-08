import { Request, Response } from 'express';

import datasource from '../../database/datasource';

import { ClassEntity } from '../../database/entities/class.entity';
import { Class } from '../../models/class.model';

export async function fetchSportClassesForAdmin(req: Request, res: Response): Promise<Response> {
    const sportId: number = +req.params['sportId'];

    try {
        const classes: Class[] = await datasource.getRepository(ClassEntity).find({
            where: {
                sport: {
                    id: sportId,
                },
            },
        });
        return res.json(classes).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
