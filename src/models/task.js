const mongoose = require("mongoose");
const validator = require("validator");

const TaskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      require: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("tasks", TaskSchema);

module.exports = Task;
