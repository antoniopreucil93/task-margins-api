import { Request, Response } from 'express';

import { sportCreateValidator } from '../../validators';
import { Sport } from '../../models';
import { SportService } from '../../services';
import { SportEntity } from '../../database/entities/sport.entity';
import datasource from '../../database/datasource';

const sportService: SportService = new SportService();

export async function createSport(req: Request, res: Response): Promise<Response> {
    const { error, value } = sportCreateValidator.validate({
        name: req.body.name,
        description: req.body.description,
    });

    if (error) {
        return res.status(400).send(error);
    }

    try {
        let newSport: Sport = sportService.createSport(value.name, value.description);

        newSport = await datasource.getRepository(SportEntity).save(newSport);

        return res.json(newSport).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
