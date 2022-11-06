import { Request, Response } from 'express';

import datasource from '../../database/datasource';
import { Sport } from '../../models';

import { SportEntity } from '../../database/entities/sport.entity';

export async function fetchManySports(req: Request, res: Response): Promise<Response> {
    try {
        const sport: Sport[] = await datasource.getRepository(SportEntity).find();

        return res.json(sport).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
