import { Request, Response } from 'express';

import datasource from '../../database/datasource';

import { ClassEntity } from '../../database/entities/class.entity';

export async function fetchClassesForAdmin(req: Request, res: Response): Promise<Response> {
    try {
        let classes = datasource.getRepository(ClassEntity).find();

        return res.json(classes).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
