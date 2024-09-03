const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Chapters/BD-3/3-update-and-delete/BD3.3_HW_1.js
 * Create an endpoint /watchlist/delete-unwatched which will return all the watched videos
 * API Call: http://localhost:3000/watchlist/delete-unwatched
 */
// Sample data
let watchList = [
  {
    videoId: 1,
    title: "JavaScript Tutorial",
    watched: false,
    url: "https://youtu.be/shorturl1",
  },
  {
    videoId: 2,
    title: "Node.js Basics",
    watched: true,
    url: "https://youtu.be/shorturl2",
  },
  {
    videoId: 3,
    title: "React.js Guide",
    watched: false,
    url: "https://youtu.be/shorturl3",
  },
];
function deleteUnwatchedVideos(video) {
  return video.watched;
}
app.get("/watchlist/delete-unwatched", (req, res) => {
  let result = watchList.filter((video) => deleteUnwatchedVideos(video));
  res.json(result);
});

/**
 * Exercise 2: Mark Video as Favorite by ID
 * Create an endpoint /watchlist/favorite to favorite a video by ID.
 * API Call: http://localhost:3000/watchlist/favorite?videoId=1&isFavorite=true
 */
// Sample data
let watchList2 = [
  {
    videoId: 1,
    title: "JavaScript Tutorial",
    watched: false,
    url: "https://youtu.be/shorturl1",
    isFavorite: false,
  },
  {
    videoId: 2,
    title: "Node.js Basics",
    watched: true,
    url: "https://youtu.be/shorturl2",
    isFavorite: false,
  },
  {
    videoId: 3,
    title: "React.js Guide",
    watched: false,
    url: "https://youtu.be/shorturl3",
    isFavorite: false,
  },
];
function markVideoAsFavorite(watchList, videoId, isFavorite) {
  watchList.forEach((video) => {
    if (video.videoId === videoId) {
      video.isFavorite = isFavorite;
    }
  });
  return watchList;
}
app.get("/watchlist/favorite", (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let isFavorite = req.query.isFavorite === "true";
  let result = markVideoAsFavorite(watchList2, videoId, isFavorite);
  res.json(result);
});

/**
 * Example 3: Update Task Status by ID
 * Create an endpoint /tasks/update to update the status of a task
 * API Call: http://localhost:3000/tasks/update?taskId=1&completed=true
 */
// Sample data
let tasks = [
  { taskId: 1, title: "Buy groceries", completed: false },
  { taskId: 2, title: "Walk the dog", completed: false },
  { taskId: 3, title: "Do laundry", completed: true },
];
function updateTaskStatusById(tasks, taskId, completed) {
  tasks.forEach((task) => {
    if (task.taskId === taskId) {
      task.completed = completed;
    }
  });
  return tasks;
}
app.get("/tasks/update", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let completed = req.query.completed === "true";
  let result = updateTaskStatusById(tasks, taskId, completed);
  res.json(result);
});

/**
 * Example 4: Remove Completed Tasks
 * Create an endpoint /tasks/remove-completed to return all the pending tasks
 * API Call: http://localhost:3000/tasks/remove-completed
 */
// sample data
let tasks2 = [
  { taskId: 1, title: "Buy groceries", completed: false },
  { taskId: 2, title: "Walk the dog", completed: false },
  { taskId: 3, title: "Do laundry", completed: true },
];
function removeCompletedTasks(task) {
  return !task.completed;
}
app.get("/tasks/remove-completed", (req, res) => {
  let result = tasks2.filter((task) => removeCompletedTasks(task));
  res.json(result);
});

/**
 * Example 5: Update Library Book Availability by ID
 * Create an endpoint /library/update to update the availability of a book
 * API call: http://localhost:3000/library/update?bookId=1&available=false
 */
// Sample data:
let books = [
  { bookId: 1, title: "1984", available: true },
  { bookId: 2, title: "Brave New World", available: true },
  { bookId: 3, title: "Fahrenheit 451", available: false },
];
function updateBookAvailabilityById(books, bookId, available) {
  books.forEach((book) => {
    if (book.bookId === bookId) {
      book.available = available;
    }
  });
  return books;
}
app.get("/library/update", (req, res) => {
  let bookId = parseInt(req.query.bookId);
  let available = req.query.available === "true";
  let result = updateBookAvailabilityById(books, bookId, available);
  res.json(result);
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
