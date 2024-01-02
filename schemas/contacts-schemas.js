import Joi from "joi";

export const contactsAddSchema = Joi.object(
    {
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        favorite: Joi.boolean().required(),
    }
);

export const contactUpdateSchema = Joi.object(
    {   
        name: Joi.string(),
        email: Joi.string(),
        phone: Joi.string(),
    }
);
