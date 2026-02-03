import React, { useState, useEffect } from 'react';
import { createTask, getTasks, deleteTask as deleteTaskApi, updateTask as updateTaskApi } from '../api/tasks';
import { logout } from '../api/auth';

export default function TaskDashboard() {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingData, setEditingData] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(false);

    // Fetch tasks from backend on mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await getTasks();
            const data = response.data.data
            setTasks(data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async () => {
        if (taskName.trim()) {
            try {

                const response = await createTask({
                    title: taskName,
                    description: taskDesc
                });
                const newTask = response.data.data
                console.log(response.data.message)
                setTasks([...tasks, newTask]);
                setTaskName('');
                setTaskDesc('');
            } catch (error) {
                console.error('Failed to add task:', error);
            }
        }
    };

    const deleteTask = async (id) => {
        try {
            await deleteTaskApi(id);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    // Updates data
    const updateTaskData = async (id, updatedFields) => {
        try {

            const response = await updateTaskApi(id, updatedFields);
            const updated = response.data.data
            console.log(response.data.message)
            setTasks(tasks.map(task => task._id === id ? updated : task));
            setEditingId(null);
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    // Toggle status
    const toggleStatus = async (id) => {
        try {
            const task = tasks.find(t => t._id === id);
            const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
            const response = await updateTaskApi(id, { status: nextStatus });
            const updated = response.data.data
            setTasks(tasks.map(t => t._id === id ? updated : t));
        } catch (error) {
            console.error('Failed to update task status:', error);
        }
    };
    const handleLogout = async () => {
        try {
            await logout()
            window.location.href = '/login';
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };
    const completedCount = tasks.filter(t => t.status === 'completed').length;

    return (
        <div className="min-h-screen bg-black from-slate-950 via-slate-900 to-slate-800 p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <h1 className="text-5xl font-bold bg-white bg-clip-text text-transparent mb-2">
                            Task Board
                        </h1>
                        <p className="text-white/60 text-lg">
                            {completedCount} of {tasks.length} completed
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-4 py-2 rounded-lg transition h-fit"
                    >
                        Logout
                    </button>
                </div>

                {/* Input Section */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8 backdrop-blur-sm">
                    <div className="space-y-3">
                        <input
                            type="text"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addTask()}
                            placeholder="Task name..."
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
                        />
                        <textarea
                            value={taskDesc}
                            onChange={(e) => setTaskDesc(e.target.value)}
                            placeholder="Description (optional)..."
                            rows="2"
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition resize-none"
                        />
                        <button
                            onClick={addTask}
                            className="w-full bg-purple-600 hover:from-cyan-600  text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105 active:scale-95"
                        >
                            <span className="text-xl font-bold">+</span>
                            Add Task
                        </button>
                    </div>
                </div>

                {/* Tasks List */}
                <div className="space-y-3">
                    {loading ? (
                        <div className="text-center py-16">
                            <p className="text-white/60 text-lg">Loading tasks...</p>
                        </div>
                    ) : tasks.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-white/60 text-lg">No tasks yet. Add one to get started!</p>
                        </div>
                    ) : (
                        tasks.map(task => (
                            <div
                                key={task._id}
                                className="group bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600 transition"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Status Checkbox */}
                                    <button
                                        onClick={() => toggleStatus(task._id)}
                                        className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition mt-1 ${task.status === 'completed'
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 border-cyan-500'
                                            : 'border-slate-600 hover:border-cyan-500'
                                            }`}
                                    >
                                        {task.status === 'completed' && <span className="text-white font-bold">✓</span>}
                                    </button>

                                    {/* Task Content */}
                                    <div className="flex-1 min-w-0">
                                        {editingId === task._id ? (
                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    value={editingData.title}
                                                    onChange={(e) => setEditingData({ ...editingData, title: e.target.value })}
                                                    className="w-full bg-slate-700 border border-cyan-500 rounded px-3 py-1 text-white focus:outline-none text-sm font-semibold"
                                                />
                                                <textarea
                                                    value={editingData.description}
                                                    onChange={(e) => setEditingData({ ...editingData, description: e.target.value })}
                                                    className="w-full bg-slate-700 border border-cyan-500 rounded px-3 py-1 text-white focus:outline-none text-sm resize-none"
                                                    rows="2"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => updateTaskData(task._id, editingData)}
                                                        className="text-xs bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded transition"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="text-xs bg-slate-600 hover:bg-slate-700 px-3 py-1 rounded transition"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() => {
                                                    setEditingId(task._id);
                                                    setEditingData({ title: task.title, description: task.description || '' });
                                                }}
                                                className="cursor-pointer"
                                            >
                                                <h3
                                                    className={`font-bold transition ${task.status === 'completed'
                                                        ? 'text-slate-400 line-through'
                                                        : 'text-white hover:text-cyan-400'
                                                        }`}
                                                >
                                                    {task.title}
                                                </h3>
                                                {task.description && (
                                                    <p className={`text-xs transition ${task.status === 'completed'
                                                        ? 'text-slate-500 line-through'
                                                        : 'text-slate-300'
                                                        }`}>
                                                        {task.description}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => deleteTask(task._id)}
                                        className="flex-shrink-0 text-slate-400 hover:text-red-400 text-2xl leading-none opacity-0 group-hover:opacity-100 transition"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Stats Footer */}
                {tasks.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-700 text-slate-400 text-sm flex justify-between">
                        <span>{tasks.filter(t => t.status !== 'completed').length} remaining</span>
                        <span>{completedCount} completed</span>
                    </div>
                )}
            </div>
        </div>
    );
}