import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDb from "./config/db.js"
import authRouter from "./routes/v1/auth.routes.js"
import taskRouter from "./routes/v1/tasks.routes.js"
import globalErrorHandler from "./middleware/globalErrorHandler.middleware.js"


const app = express()

//middleware
app.use(cors(({
    origin: "http://localhost:5173",
    credentials: true
})))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/tasks", taskRouter)

//global error handler must be last
app.use(globalErrorHandler)

connectDb()
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})