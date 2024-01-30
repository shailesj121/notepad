class apiError extends Error {
    constructor(
        statusCode,
        message = "somthing went Wrong",
        errors = [],
        stack = ""

    ){
super(message)
this.statusCode = statusCode
this.errors = errors
this.message = message
this.success = false
this.stack = stack
    }
}

export { apiError }