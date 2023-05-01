
// Get the request respose and the next parameter
const notFound = (req, res, next) => {
    // After this logic is executed execute the next(error)
    // Send the error message to the server
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);

};

// Function to handle the error if it keeps happening after notFound function is executed
const errorHandler = (err, req, res, next) =>
{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

module.exports= { notFound, errorHandler };