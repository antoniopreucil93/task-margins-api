import * as Joi from 'joi';

const rateCreateValidator = Joi.object({
    rate: Joi.number().required(),
    classId: Joi.number().required(),
});

const commentCreateValidator = Joi.object({
    comment: Joi.string().required(),
    classId: Joi.number().required(),
});

export { rateCreateValidator, commentCreateValidator };
