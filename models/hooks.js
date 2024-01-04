export const handleOnSaveError = (error, data, next) => {
    error.status = 400;
    next();
};

export const addUpdatesSettings = function (next) {
    this.options.new = true;
    this.options.new = true;
    next();
};