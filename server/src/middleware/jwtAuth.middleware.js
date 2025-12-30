import apiError from "../util/apiError.js";
import asyncHandler from "../util/asyncHandler.js";
import { verifyTokens } from "../util/token.js";

const jwtAuth = asyncHandler(async (req, res, next) => {
    const accessToken = req.cookies?.accessToken //question mark here means optional chaining
    if (!accessToken) {
        throw new apiError(401, "Authentication required ")
    }
    const payload = verifyTokens(accessToken, "access")
    req.user = payload
    next()
})


export default jwtAuth;