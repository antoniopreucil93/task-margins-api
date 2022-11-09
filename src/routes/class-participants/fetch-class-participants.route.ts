import { Request, Response } from 'express';
import { ClassParticipants } from '../../models';
import datasource from '../../database/datasource';
import { ClassParticipantEntity } from '../../database/entities/class-participants.entity';

export async function fetchClassParticipants(req: Request, res: Response): Promise<Response> {
    try {
        const classId: number = +req.params['classId'];

        const classParticpants: ClassParticipants[] = await datasource
            .getRepository(ClassParticipantEntity)
            .find({
                where: {
                    class: {
                        id: classId,
                    },
                },
            });

        return res.json(classParticpants).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
