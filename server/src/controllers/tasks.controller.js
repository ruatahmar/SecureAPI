const createTask = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        throw new apiError(400, "Title is required");
    }

    const task = await Task.create({
        title,
        description,
        owner: req.user.userId
    });

    res.status(201).json(
        new apiResponse(201, task, "Task created successfully")
    );
});
const getTasks = asyncHandler(async (req, res) => {
    const filter =
        req.user.role === "admin"
            ? {}
            : { owner: req.user.userId };

    const tasks = await Task.find(filter);

    res.status(200).json(
        new apiResponse(200, tasks, "Tasks fetched successfully")
    );
});
const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
        throw new apiError(404, "Task not found");
    }

    if (
        req.user.role !== "admin" &&
        task.owner.toString() !== req.user.userId
    ) {
        throw new apiError(403, "Unauthorized");
    }

    Object.assign(task, req.body);
    await task.save();

    res.status(200).json(
        new apiResponse(200, task, "Task updated successfully")
    );
});
const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
        throw new apiError(404, "Task not found");
    }

    if (
        req.user.role !== "admin" &&
        task.owner.toString() !== req.user.userId
    ) {
        throw new apiError(403, "Unauthorized");
    }

    await task.deleteOne();

    res.status(200).json(
        new apiResponse(200, null, "Task deleted successfully")
    );
});
export { createTask, getTasks, updateTask, deleteTask };
