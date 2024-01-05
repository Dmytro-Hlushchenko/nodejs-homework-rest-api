import bcrypt from "bcrypt";
import User from "../models/User.js";
import { ctrlWrapper } from "../decorators/index.js"
import { HttpError } from "../helpers/index.js";

const userRegister = async (req, res) => {
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
    });
};

const userLogin = async (req, res) => { 
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) { 
        throw HttpError(401, "Email or password is wrong");
    };
};

export default {
    userRegister: ctrlWrapper(userRegister),
    userLogin: ctrlWrapper(userLogin),
};
