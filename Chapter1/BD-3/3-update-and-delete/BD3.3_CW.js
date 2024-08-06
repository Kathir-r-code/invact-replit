const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Sample data
 */
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

/**
 * Exercise 1: Update the Watched Status of a Video by ID
 * Create an endpoint /watchlist/update to update the status of a video
 * API Call: http://localhost:3000/watchlist/update?videoId=1&watched=true
 */
function updateWatchedStatusById(watchList, videoId, watched) {
  for (let i = 0; i < watchList.length; i++) {
    if (watchList[i].videoId === videoId) {
      watchList[i].watched = watched;
      break;
    }
  }
  return watchList;
}
app.get("/watchlist/update", (req, res) => {
  const videoId = parseInt(req.query.videoId);
  const watched = req.query.watched === "true";
  const result = updateWatchedStatusById(watchList, videoId, watched);
  res.json(result);
});

/**
 * Exercise 2: Update the Watched Status of All Videos
 * Create an endpoint /watchlist/update-all to update the status of all videos
 * API Call: http://localhost:3000/watchlist/update-all?watched=true
 */
function updateWatchedStatusOfAllVideos(watchList, watched) {
  for (let i = 0; i < watchList.length; i++) {
    watchList[i].watched = watched;
  }
  return watchList;
}
app.get("/watchlist/update-all", (req, res) => {
  const watched = req.query.watched === "true";
  const result = updateWatchedStatusOfAllVideos(watchList, watched);
  res.json(result);
});

/**
 * Exercise 3: Delete a Video by ID
 * Create an endpoint /watchlist/delete to return all videos except the video specified by videoId
 * API Call: http://localhost:3000/watchlist/delete?videoId=2
 */
function deleteVideoById(video, videoId) {
  return video.videoId !== videoId;
}
app.get("/watchlist/delete", (req, res) => {
  const videoId = parseInt(req.query.videoId);
  const result = watchList.filter((video) => deleteVideoById(video, videoId));
  res.json(result);
});

/**
 * Exercise 4: Delete Watched Videos
 * Create an endpoint /watchlist/delete-watched to only return videos that haven’t been watched
 * API Call: http://localhost:3000/watchlist/delete-watched
 */
function isWatched(video) {
  return !video.watched;
}
app.get("/watchlist/delete-watched", (req, res) => {
  const result = watchList.filter((video) => isWatched(video));
  res.json(result);
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
