import mongoose from "mongoose";

const userScema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  tasks: { type: Object },
  notifications: { type: Object },
  createdAt: { type: Date },
});

export const User = mongoose.model("User", userScema);
