import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { contactsAddSchema, contactUpdateSchema, contactStatusSchema } from "../models/Contact.js";

const getAll = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const result = await Contact.find({ owner },"", {skip, limit});
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        const { _id: owner } = req.user;
        const result = await Contact.findOne({_id: owner});
        
        if (!result) {
            throw HttpError(404, `Contact with id=${id} is not found`);
        };

        res.json(result);

    } catch (error) {
        next(error);
    }
};

const add = async (req, res, next) => {
    try {
        const { error } = contactsAddSchema.validate(req.body);
        if (error) {
            throw HttpError(400, `missing field ${error.message}`);
        }
        const { _id: owner } = req.user;
        const result = await Contact.create({ ...req.body, owner });
        res.status(201).json(result);
    }   
    catch (error) {
        next(error);
    };
};

const removeContact = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        const { _id: owner } = req.user;
        const result = await Contact.findOneAndDelete({_id: owner});
        if (!result) {
            throw HttpError(404, `Contact with id=${id} is not found`)
        };
        res.json({ message: "contact deleted" });
    
    } catch (error) {
        next(error);
    }
};

const updateById = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        const { _id: owner } = req.user;
        const result = await Contact.findOneAndUpdate({_id, owner}, req.body);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} is not found`);
        };
        
        const { error } = contactUpdateSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        
        res.json(result);
        
    } catch (error) {
        next(error);
    }
};

const updateStatusContact = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        const { _id: owner } = req.user;
        const result = await Contact.findOneAndUpdate({_id, owner}, req.body);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} is not found`);
        };
        
        const { error } = contactStatusSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export default {
    getAll,
    getById,
    add,
    removeContact,
    updateById,
    updateStatusContact,
};