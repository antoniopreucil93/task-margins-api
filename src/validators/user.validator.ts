import * as Joi from 'joi';
import { Adulthood, UserRole } from '../enum';

export const userUpdateValidator = Joi.object({
    username: Joi.string().min(1).email(),
    password: Joi.string().min(5),
    ageLevel: Joi.string().valid(...Object.values(Adulthood)),
    role: Joi.string().valid(...Object.values(UserRole)),
}).unknown();
