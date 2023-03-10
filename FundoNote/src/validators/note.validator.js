import Joi from '@hapi/joi';

export const newNoteValidator = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(4).required(),
        description: Joi.string().min(4).required(),
        color: Joi.string().min(3).optional(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        console.log(error)
        next(error);
    } else {
        next();
    }
}