import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { contactStatusSchema, } from "../models/Contact.js";

const getAll = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const result = await Contact.find({ owner },"-createdAT -updatedAT", {skip, limit});
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { _id } = req.user;
        const result = await Contact.findOne({_id: contactId, owner: _id});
        
        if (!result) {
            throw HttpError(404, `Contact with id=${contactId} is not found`);
        };

        res.json(result);  

    } catch (error) {
        next(error);
    }
};

const add = async (req, res) => {
    
        const { _id: owner } = req.user;
        const result = await Contact.create({ ...req.body, owner });
        res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { _id } = req.user;
        const result = await Contact.findOneAndDelete({ _id: contactId, owner: _id });
        if (!result) {
            throw HttpError(404, `Contact with id=${contactId} is not found`)
        };
        res.json({ message: "contact deleted" });
    
    } catch (error) {
        next(error);
    }
};

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const { _id } = req.user;
    const result = await Contact.findOneAndUpdate({ _id: contactId, owner: _id }, req.body);
    if (!result) {
        throw HttpError(404, `Contact with id=${id} is not found`);
    };
        
    res.json(result);
};

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const { _id } = req.user;
    const result = await Contact.findOneAndUpdate({ _id: contactId, owner: _id }, req.body);
    if (!result) {
        throw HttpError(404, `Contact with id=${id} is not found`);
    };
        
    res.json(result);
};

export default {
    getAll,
    getById,
    add,
    removeContact,
    updateById,
    updateStatusContact,
};