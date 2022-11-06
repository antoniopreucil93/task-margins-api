import { Request, Response } from 'express';

import { sportRepository } from '../../database/repositories/sport.repository';
import { Sport } from '../../models';

export async function fetchSport(req: Request, res: Response): Promise<Response> {
    const sportId: number = +req.params['sportId'];

    try {
        const sport: Sport = await sportRepository.findSportById(sportId);

        if (!sport) {
            return res.status(404).json('Sport not found!');
        }

        return res.json(sport).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
