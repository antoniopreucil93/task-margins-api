import * as Joi from 'joi';
import { Adulthood, UserRole } from '../enum';

export const registeralidator = Joi.object({
    username: Joi.string().min(1).email().required(),
    password: Joi.string().min(5).required(),
    ageLevel: Joi.string()
        .valid(...Object.values(Adulthood))
        .required(),
    role: Joi.string()
        .valid(...Object.values(UserRole))
        .required(),
}).unknown();
