import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import taskRouter from "./routes/tasks.routes.js"
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
app.use("/api/auth", authRouter)
app.use("/api/task", taskRouter)

//global error handler must be last
app.use(globalErrorHandler)

connectDb()
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})