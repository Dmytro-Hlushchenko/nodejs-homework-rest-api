import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleOnSaveError } from "./hooks.js";

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
        favorite: Joi.boolean(),
    }
);

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleOnSaveError)

const Contact = model("contact", contactSchema);

export default Contact;