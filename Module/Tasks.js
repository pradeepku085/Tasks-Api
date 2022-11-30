const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskID: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  is_completed: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tasks", taskSchema);
