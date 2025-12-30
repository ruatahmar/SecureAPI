class apiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong. API ERROR"
    ) {
        super(message)
        this.status = statusCode
        this.message = message
    }
}

export default apiError