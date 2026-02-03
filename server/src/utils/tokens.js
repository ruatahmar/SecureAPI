import jwt from "jsonwebtoken"
import asyncHandler from "./asyncHandler.js";
import apiError from "./apiError.js";

const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET



const generateAccessToken = (data) => {
    return jwt.sign(
        data,
        accessTokenSecret,
        {
            expiresIn: accessTokenExpiry
        }
    )
}

const generateRefreshToken = (data) => {
    return jwt.sign(
        data,
        refreshTokenSecret,
        {
            expiresIn: refreshTokenExpiry
        }
    )
}

const refreshAccessToken = asyncHandler()

const Mode = {
    refresh: refreshTokenSecret,
    access: accessTokenSecret,
};
const verifyTokens = (token, mode) => {
    const secret = Mode[mode]
    if (!secret) {
        throw new apiError(400, "Token type incorrect check again")
    }

    try {
        return jwt.verify(token, secret)
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            throw new apiError(401, "Token expired")
        }
        throw new apiError(401, "Invalid token")

    }

}

export { generateAccessToken, generateRefreshToken, verifyTokens } 