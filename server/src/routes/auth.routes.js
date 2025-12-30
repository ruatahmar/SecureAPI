import { registerUser, loginUser, logoutUser } from "../controller/auth.controller.js"
import { Router } from "express"

const authRouter = Router()

authRouter.post("/login", loginUser);
authRouter.post("/logoutUser", logoutUser);
authRouter.post("/register", registerUser);


export default authRouter;