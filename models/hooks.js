export const handleOnSaveError = (error, data, next) => {
    const { name, code } = error;
    error.status = (name === "MongoServerError" && code === 11000) ? 409: 400;
    next();
};

export const addUpdatesSettings = function (next) {
    this.options.new = true;
    this.options.new = true;
    next();
};