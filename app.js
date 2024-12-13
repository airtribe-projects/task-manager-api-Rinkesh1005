const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasks = [
  {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
  },
  {
    id: 2,
    title: "Create a new project",
    description: "Create a new project using the Express application generator",
    completed: true,
  },
  {
    id: 3,
    title: "Install nodemon",
    description: "Install nodemon as a development dependency",
    completed: true,
  },
  {
    id: 4,
    title: "Install Express",
    description: "Install Express",
    completed: false,
  },
  {
    id: 5,
    title: "Install Mongoose",
    description: "Install Mongoose",
    completed: false,
  },
  {
    id: 6,
    title: "Install Morgan",
    description: "Install Morgan",
    completed: false,
  },
  {
    id: 7,
    title: "Install body-parser",
    description: "Install body-parser",
    completed: false,
  },
  {
    id: 8,
    title: "Install cors",
    description: "Install cors",
    completed: false,
  },
  {
    id: 9,
    title: "Install passport",
    description: "Install passport",
    completed: false,
  },
  {
    id: 10,
    title: "Install passport-local",
    description: "Install passport-local",
    completed: false,
  },
  {
    id: 11,
    title: "Install passport-local-mongoose",
    description: "Install passport-local-mongoose",
    completed: false,
  },
  {
    id: 12,
    title: "Install express-session",
    description: "Install express-session",
    completed: false,
  },
  {
    id: 13,
    title: "Install connect-mongo",
    description: "Install connect-mongo",
    completed: false,
  },
  {
    id: 14,
    title: "Install dotenv",
    description: "Install dotenv",
    completed: false,
  },
  {
    id: 15,
    title: "Install jsonwebtoken",
    description: "Install jsonwebtoken",
    completed: false,
  },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found." });
  }
  return res.status(200).send(task);
});

app.post("/tasks", (req, res) => {
  const { title, description, completed } = req.body;

  if (!title || !description || typeof completed !== "boolean") {
    return res.status(400).json({
      message: "Invalid data.",
    });
  }
  const id = tasks.length + 1;
  const newTask = {
    id,
    title,
    description,
    completed,
  };
  tasks.push(newTask);
  res.status(201).json({ message: "Task created successfully", task: newTask });
});

app.put("/tasks/:id", (req, res) => {
  const { title, description, completed } = req.body;
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({ message: "Invalid DataTypes" });
  }

  task.title = title;
  task.description = description;
  task.completed = completed;

  res.status(200).json({ message: "Task updated successfully.", task });
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.status(200).send({ message: "Task deleted successfully" });
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
