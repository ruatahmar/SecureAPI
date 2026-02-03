import { registerUser, loginUser, logoutUser, refreshAccessToken } from "../../controllers/v1/auth.controller.js"
import { Router } from "express"
import jwtAuth from "../../middleware/jwtAuth.middleware.js";

const authRouter = Router()

authRouter.post("/login", loginUser);
authRouter.post("/logout", jwtAuth, logoutUser);
authRouter.post("/register", registerUser);
authRouter.post("/refresh", refreshAccessToken);

export default authRouter;