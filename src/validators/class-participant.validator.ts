import * as Joi from 'joi';

const applyOnClassValidator = Joi.object({
    classId: Joi.number().required(),
});

export { applyOnClassValidator };
