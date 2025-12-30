import apiError from "../utils/apiError.js";

export default function globalErrorHandler(err, req, res, next) {
    console.error(err);

    if (err instanceof apiError) {
        console.log(err.status)
        return res.status(err.status).json({
            status: err.status,
            message: err.message
        });
    }

    return res.status(500).json({
        status: 500,
        message: "Internal Server Error"
    });
};

