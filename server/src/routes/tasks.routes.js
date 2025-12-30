import { Router } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/tasks.controller.js"
import jwtAuth from "../middleware/jwtAuth.middleware.js";

const taskRouter = Router()

taskRouter.post("/", jwtAuth, createTask)
taskRouter.get("/", jwtAuth, getTasks)
taskRouter.put("/:id", jwtAuth, updateTask)
taskRouter.delete("/:id", jwtAuth, deleteTask)

export default taskRouter;