import express from "express"
import authRouter from "./routes/auth.routes"
import taskRouter from "./routes/tasks.routes"
import globalErrorHandler from "./middleware/globalErrorHandler.middleware"

const app = express()


app.use(globalErrorHandler)


app.use("/api/auth", authRouter)
app.use("/api/task", taskRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})