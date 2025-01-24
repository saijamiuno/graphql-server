import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  users: { type: Object, default: [] },
});

export const Task = mongoose.model("Task", taskSchema);
