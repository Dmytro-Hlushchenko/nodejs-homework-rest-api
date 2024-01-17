import "dotenv/config";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import gravatar from "gravatar";
import path from "path";
import jwt from "jsonwebtoken";
import fs from "fs/promises";

const avatarPath = path.resolve("public", "avatars");


const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
    console.error("Error: JWT_SECRET is not defined");
    process.exit(1);
}


const userRegister = async (req, res) => {
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const gravatarURL = gravatar.url(email);
    const avatarArray = gravatarURL.split('.');
    const avatarURL = avatarArray.length > 1 ? avatarArray.slice(1).join('.') : "";


    const newUser = await User.create({ ...req.body, avatarURL, password: hashPassword });
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
    });
};
const updateAvatar = async (req, res) => {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);
    const newAvatarURL = path.join("avatars", filename);
    console.log(newAvatarURL);

    const result = await User.findOneAndUpdate({ avatarURL: newAvatarURL });
    if (!result) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    res.json({
        user: {
            avatarURL: result.avatarURL,
        }
    });
};


const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    };
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong"); 
    };

    const { _id: id } = user;
    const payload = { id };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "36h" });
    await User.findByIdAndUpdate(id, { token });

    res.json({
        token: token,
        user: {
            email: email,
            subscription: "starter",
        }
    });
};
const getCurrent = async (req, res) => {
    const { email, subscription} = req.user;

    res.json({ email, subscription });
};
const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
        message: "No content"
    })
};

export default {  
    userRegister: ctrlWrapper(userRegister),
    updateAvatar: ctrlWrapper(updateAvatar),
    userLogin: ctrlWrapper(userLogin),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
};
  