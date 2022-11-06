import { Request, Response } from 'express';

import { classRepository } from '../../database/repositories/classes.repository';
import { Class } from '../../models/class.model';

export async function fetchOneClassForAdmin(req: Request, res: Response): Promise<Response> {
    try {
        const classId: number = +req.params['classId'];

        const sportClass: Class = await classRepository.findClassById(classId);

        if (!sportClass) {
            return res.status(404).json('Class not found!');
        }

        return res.json(sportClass).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
