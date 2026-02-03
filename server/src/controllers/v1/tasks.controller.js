import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";
import Task from "../../models/v1/tasks.models.js";


const createTask = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    console.log(req.user)
    const { title, description } = req.body;
    if (!title) {
        throw new apiError(400, "Title is required");
    }
    const task = await Task.create({
        title,
        description,
        owner: userId
    });

    res.status(201).json(
        new apiResponse(201, task, "Task created successfully")
    );
});

const getTasks = asyncHandler(async (req, res) => {
    //filters if its for admin or user
    const filter = req.user.role === "admin" ? {} : { owner: req.user.userId };
    const tasks = await Task.find(filter);
    res.status(200).json(
        new apiResponse(200, tasks, "Tasks fetched successfully")
    );
});

const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId, role } = req.user
    const allowedUpdates = ["title", "description", "status"];

    const task = await Task.findById(id);
    if (!task) {
        throw new apiError(404, "Task not found");
    }

    if (
        role !== "admin" &&
        task.owner.toString() !== userId
    ) {
        throw new apiError(403, "Unauthorized");
    }

    //this prevents unauthorised updates, like updates on owner
    allowedUpdates.forEach(field => {
        if (req.body[field] !== undefined) {
            task[field] = req.body[field];
        }
    });
    await task.save();

    res.status(200).json(
        new apiResponse(200, task, "Task updated successfully")
    );
});

const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId, role } = req.user
    const task = await Task.findById(id);
    if (!task) {
        throw new apiError(404, "Task not found");
    }

    if (
        req.user.role !== "admin" &&
        task.owner.toString() !== userId
    ) {
        throw new apiError(403, "Unauthorized");
    }
    if (role !== 'admin' && task.owner.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'You can only delete your own tasks' });
    }
    await Task.findByIdAndDelete(id);

    res.status(200).json(
        new apiResponse(200, task, "Task deleted successfully")
    );
});
export { createTask, getTasks, updateTask, deleteTask };
