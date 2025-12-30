import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/users.models.js"
import { generateAccessToken, generateRefreshToken, verifyTokens } from "../utils/tokens.js"

const generateTokens = async (userId) => {

    const data = { userId }
    const accessToken = generateAccessToken(data)
    const refreshToken = generateRefreshToken(data)

    return { accessToken, refreshToken }
}
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
};
const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const existedUser = await User.findOne({ email })
    if (existedUser) {
        throw new apiError(400, "User already signed up with this email")
    }
    const user = await User.create({
        email,
        password
    })
    const { accessToken, refreshToken } = await generateTokens(user._id)
    //store only refresh tokens
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    //return both tokens in cookies 
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new apiError(400, "Problem occured in creating user")
    }

    return res.status(200).cookie("refreshToken", refreshToken, cookieOptions)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(
            new apiResponse(
                201,
                {
                    user: createdUser
                },
                "User account successfully created"
            )
        )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        throw new apiError(400, "Email not provided")
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new apiError(400, "User does not exist. Please register")
    }
    //check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new apiError(400, "Incorrect password")
    }

    const { accessToken, refreshToken } = await generateTokens(user._id)
    //store only refresh tokens
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })
    const safeUser = await User.findById(user._id).select("-password -refreshToken");
    //return both tokens in cookies 
    return res.status(200).cookie("refreshToken", refreshToken, cookieOptions)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(
            new apiResponse(
                200,
                {
                    user: safeUser
                },
                "Successfully logged in"
            )
        )
})

const logoutUser = asyncHandler()

export { registerUser, loginUser, logoutUser }