const express = require("express");
let cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());

// AirFlow Task Management System
// Data Structure
let tasks = [
  { taskId: 1, text: "Fix bug #101", priority: 2 },
  { taskId: 2, text: "Implement feature #202", priority: 1 },
  { taskId: 3, text: "Write documentation", priority: 3 },
];

/**
 * Endpoint 1. Add a Task to the Task List
 * Objective: Add a new task to the task list using the provided details.
 * Endpoint: /tasks/add
 * Example Call: http://localhost:3000/tasks/add?taskId=4&text=Review%20code&priority=1
 */
function addTaskToTaskList(tasks, taskId, text, priority) {
  let newTask = { taskId: taskId, text: text, priority: priority };
  tasks.push(newTask);
  return tasks;
}
app.get("/tasks/add", (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;
  const priority = parseInt(req.query.priority);
  tasks = addTaskToTaskList(tasks, taskId, text, priority);
  res.json({ tasks });
});

/**
 * Endpoint 2. Read All Tasks in the Task List
 * Objective: Return the current list of tasks.
 * Endpoint: /tasks
 * Example Call: http://localhost:3000/tasks
 */
function readAllTasks(tasks) {
  return tasks;
}
app.get("/tasks", (req, res) => {
  tasks = readAllTasks(tasks);
  res.json({ tasks });
});

/**
 * Endpoint 3. Sort Tasks by Priority
 * Objective: Sort tasks by their priority in ascending order.
 * Endpoint: /tasks/sort-by-priority
 * Example Call: http://localhost:3000/tasks/sort-by-priority
 */
function sortTasksByPriority(tasks) {
  tasks.sort((a, b) => a.priority - b.priority);
  return tasks;
}
app.get("/tasks/sort-by-priority", (req, res) => {
  tasks = sortTasksByPriority(tasks);
  res.json({ tasks });
});

/**
 * Endpoint 4. Edit Task Priority
 * Objective: Edit the priority of an existing task based on the task ID.
 * Endpoint: /tasks/edit-priority
 * Example Call: http://localhost:3000/tasks/edit-priority?taskId=1&priority=1
 */
function editTaskPriorityById(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
      break;
    }
  }
  return tasks;
}
app.get("/tasks/edit-priority", (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const priority = parseInt(req.query.priority);
  tasks = editTaskPriorityById(tasks, taskId, priority);
  res.json({ tasks });
});

/**
 * Endpoint 5. Edit/Update Task Text
 * Objective: Edit the text of an existing task based on the task ID.
 * Endpoint: /tasks/edit-text
 * Example Call: http://localhost:3000/tasks/edit-text?taskId=3&text=Update%20documentation
 */
function editTaskTextById(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
      break;
    }
  }
  return tasks;
}
app.get("/tasks/edit-text", (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;
  tasks = editTaskTextById(tasks, taskId, text);
  res.json({ tasks });
});

/**
 * Endpoint 6. Delete a Task from the Task List
 * Objective: Delete a task from the task list based on the task ID.
 * Endpoint: /tasks/delete
 * Example Call: http://localhost:3000/tasks/delete?taskId=2
 */
function deleteTaskById(task, taskId) {
  return task.taskId !== taskId;
}
app.get("/tasks/delete", (req, res) => {
  const taskId = parseInt(req.query.taskId);
  tasks = tasks.filter((task) => deleteTaskById(task, taskId));
  res.json({ tasks });
});

/**
 * Endpoint 7. Filter Tasks by Priority
 * Objective: Return tasks that match a specified priority.
 * Endpoint: /tasks/filter-by-priority
 * Example Call: http://localhost:3000/tasks/filter-by-priority?priority=1
 */
function filterTasksByPriority(task, priority) {
  return task.priority === priority;
}
app.get("/tasks/filter-by-priority", (req, res) => {
  const priority = parseInt(req.query.priority);
  tasks = tasks.filter((task) => filterTasksByPriority(task, priority));
  res.json({ tasks });
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
