import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyTokens } from "../utils/tokens.js";

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