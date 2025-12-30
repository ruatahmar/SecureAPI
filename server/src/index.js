import express from "express"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import taskRouter from "./routes/tasks.routes.js"
import globalErrorHandler from "./middleware/globalErrorHandler.middleware.js"

const app = express()


app.use(globalErrorHandler)


app.use("/api/auth", authRouter)
app.use("/api/task", taskRouter)


connectDb()
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})