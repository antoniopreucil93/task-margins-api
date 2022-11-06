import { Request, Response } from 'express';

import { sportUpdateValidator } from '../../validators';
import { Sport } from '../../models';
import { SportEntity } from '../../database/entities/sport.entity';
import datasource from '../../database/datasource';
import { sportRepository } from '../../database/repositories/sport.repository';

export async function updateSport(req: Request, res: Response): Promise<Response> {
    const { error, value } = sportUpdateValidator.validate({
        name: req.body.name,
        description: req.body.description,
    });

    if (error) {
        return res.status(400).send(error);
    }

    const sportId: number = +req.params['sportId'];

    try {
        let sport: Sport = await sportRepository.findSportById(sportId);

        if (!sport) {
            return res.status(404).json('Sport not found!');
        }

        sport = await datasource.getRepository(SportEntity).save({
            ...sport,
            name: value.name ? value.name : sport.name,
            description: value.description ? value.description : value.description,
        });

        return res.json(sport).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
