import User from "../models/User.js";
import { HttpError } from "../helpers/index.js";

const userRegister = async (req, res) => {
    const newUser = await User.create(req.body);

    res.json({
        user: {
            email: newUser.email,
            password: newUser.password
        }
    });
};

export default {
    userRegister,
};
