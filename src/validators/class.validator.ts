import * as Joi from 'joi';

import { Adulthood } from '../enum';

const weekScheduleValidator = Joi.object().keys({
    date: Joi.string().isoDate(),
    time: Joi.string(),
});

const weeksScheduleValidator = Joi.array().items(weekScheduleValidator);

const classCreateValidator = Joi.object({
    ageLevel: Joi.string()
        .valid(...Object.values(Adulthood))
        .required(),
    weekSchedule: Joi.array().items(weeksScheduleValidator),
    maxNumberOfParticipants: Joi.number(),
    sportId: Joi.number().required(),
});

const classUpdateValidator = Joi.object({
    ageLevel: Joi.string().valid(...Object.values(Adulthood)),
    weekSchedule: Joi.array().items(weeksScheduleValidator),
    maxNumberOfParticipants: Joi.number(),
    sportId: Joi.number(),
});

export { classCreateValidator, classUpdateValidator };
