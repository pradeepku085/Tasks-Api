const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Tasks = require("./Module/Tasks");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 6000;

//database Connection

const connectDB = async () => {
  try {
    return await mongoose.connect("mongodb://localhost:27017/taskAPI", () => {
      console.log(`Database connected Successfully.`);
    });
  } catch (error) {
    console.log(error);
    message: error;
  }
};

connectDB();

// Generate Unique ID for each Task
const newTaskID = async () => {
  const user = await Tasks.find();
  const ID = user.length + 1;
  return ID;
};

//Test Case 1 - Create a new Task
app.post("/v1/tasks", async (req, res) => {
  try {
    if (true) {
      let ID = await newTaskID();
      console.log(ID);
      let task = await Tasks.create({
        taskID: ID,
        title: req.body.title,
        is_completed: false,
      });
      console.log(task);
      res.status(201).json({
        status: "success",
        data: {
          ID,
        },
      });
    } else {
      res.status(400).json({
        status: "success",
        data: {
          message: "No Data Found for the user.",
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
});

//Test Case 2 - List all tasks created
app.get("/v1/tasks", async (req, res) => {
  try {
    if (true) {
      const result = await Tasks.find();
      if (result.length > 0) {
        res.status(200).json({
          status: "success",
          data: {
            result,
          },
        });
      } else {
        res.status(400).json({
          status: "success",
          data: {
            message: "No data found for this user",
          },
        });
      }
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
});

// Test Case 3 - Get a specific task
app.get("/v1/tasks/:id", async (req, res) => {
  try {
    if (true) {
      const result = await Tasks.find({ taskID: req.params.id });
      if (result.length > 0) {
        res.status(200).json({
          status: "success",
          data: {
            result,
          },
        });
      } else {
        res.status(400).json({
          status: "success",
          data: {
            message: " No data found for this user.",
          },
        });
      }
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
});

//Test Case 4- Delete a specific task
app.delete("/v1/tasks/:id", async (req, res) => {
  try {
    if (true) {
      const task = await Tasks.deleteOne({ taskID: req.params.id });
      res.status(204).json({});
    } else {
      res.status(400).json({
        status: "success",
        data: {
          message: "No data found for this user.",
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
});

//Test Case 5 - Edit the title or completion of a specific task
app.put("/v1/tasks/:id", async (req, res) => {
  try {
    if (true) {
      const task = await Tasks.updateOne(
        {
          id: req.query.id,
        },
        {
          $set: {
            is_completed: new Boolean(req.query.is_completed),
            title: req.query.title,
          },
        }
      );
      res.status(204).json({});
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
});

//Test Case 6 - Bulk add tasks
app.put("/v1/tasks/", async (req, res) => {
  try {
    if (true) {
      const task = await Tasks.findOneAndUpdate([
        {
          id: req.query.id,
        },
        {
          $set: {
            is_completed: new Boolean(req.query.is_completed),
            title: req.query.title,
          },
        },
      ]);
      console.log(id);
      res.status(201).json({
        status: "success",
        tasks: {
          ID: id,
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
});

//invalid Path
app.all("*", async (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Invalid Path.",
  });
});

app.listen(port, () => {
  console.log(`Server started on ${port}.`);
});
