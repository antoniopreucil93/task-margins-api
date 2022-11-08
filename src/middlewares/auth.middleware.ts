import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import datasource from '../database/datasource';

import { UserEntity } from '../database/entities/user.entity';
import { User } from '../models';
import { UserRole } from '../enum';
import { userRepository } from '../database/repositories/user.repository';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokenHeader = req.headers['authorization'];

        if (!tokenHeader) {
            return res.status(401).send('Missing token.');
        }

        if (!tokenHeader.startsWith('Bearer ')) {
            return res.status(401).send('Missing Bearer.');
        }

        const token = tokenHeader.split('Bearer ')[1];

        const tokenPayload = await verify(token);

        const userId = tokenPayload['userId'];

        const user: User = await userRepository.findUserById(userId);

        if (!user.isVerified) {
            return res.status(400).json({ message: 'User not verified.' });
        }

        req['userId'] = tokenPayload['userId'];
        req['userRole'] = tokenPayload['userRole'];

        next();
    } catch (err) {
        return res.status(401).send(err);
    }
};

export function role(roles: UserRole[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req['userRole'];

        if (!roles.includes(userRole)) {
            return res.status(401).send('Insufficient privilege level.');
        }

        next();
    };
}

function verify(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}
