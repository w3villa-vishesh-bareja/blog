const responseHandler = (res, statusCode =200, message = "Successfull Hit", data = []) => {

    res.status(statusCode).json({
        success: statusCode < 400,
        status: statusCode,
        message,
        data,
    });
}

export default responseHandler;