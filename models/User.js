import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleOnSaveError, addUpdatesSettings } from "./hooks.js";

const userSchema = new Schema({

    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
    },

}, { versionKey: false, timestamps: true });

userSchema.post("save", handleOnSaveError);
userSchema.pre("findOneAndUpdate", addUpdatesSettings);
userSchema.post("findOneAndUpdate", handleOnSaveError);

export const userRegistrationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});
export const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const User = model("user", userSchema);

export default User;  