export const handleOnSaveError = (error, data, next) => {
    error.status = 400;
    next();
};