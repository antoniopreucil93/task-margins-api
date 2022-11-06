import * as Joi from 'joi';

const sportCreateValidator = Joi.object({
    name: Joi.string().min(1).required(),
    description: Joi.string().min(15),
});

const sportUpdateValidator = Joi.object({
    name: Joi.string().min(1),
    description: Joi.string().min(15),
});

export { sportCreateValidator, sportUpdateValidator };
