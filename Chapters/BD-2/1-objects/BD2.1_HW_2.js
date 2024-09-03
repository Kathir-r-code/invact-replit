const express = require("express");
const { addAbortSignal } = require("stream");
const app = express();
const PORT = 3000;

// Define an object on server: the github public data
let githubPublicData = {
  username: "ankit123",
  fullName: "Ankit Kumar",
  email: "ankit@gmail.com",
  repositories: 24,
  gits: 12,
  joinedOn: "Sep 2018",
};

/**
 * Exercise 1: Profile URL
 * Define the function getProfileUrl to return the GitHub profile URL of the user.
 * Sample Endpoint: /github-profile
 */
function getProfileUrl(githubPublicData) {
  return `https://github.com/${githubPublicData.username}`;
}
app.get("/github-profile", (req, res) => {
  let profileUrl = getProfileUrl(githubPublicData);
  res.json({ profileUrl: profileUrl });
});

/**
 * Exercise 2: Public Email
 * Sample Endpoint: http://localhost:3000/github-public-email
 */
function getPublicEmail(githubPublicData) {
  return githubPublicData.email;
}
app.get("/github-public-email", (req, res) => {
  let publicEmail = getPublicEmail(githubPublicData);
  res.json({ publicEmail: publicEmail });
});

/**
 * Exercise 3: Get Repos Count
 * Sample Endpoint: http://localhost:3000/github-repos-count
 */
function getReposCount(githubPublicData) {
  return githubPublicData.repositories;
}
app.get("/github-repos-count", (req, res) => {
  let reposCount = getReposCount(githubPublicData);
  res.json({ reposCount: reposCount });
});

/**
 * Exercise 4: Get Gists Count
 * Sample Endpoint: http://localhost:3000/github-gists-count
 */
function getGistsCount(githubPublicData) {
  return githubPublicData.gits;
}
app.get("/github-gists-count", (req, res) => {
  let gistsCount = getGistsCount(githubPublicData);
  res.json({ gistsCount: gistsCount });
});

/**
 * Exercise 5: Get User Bio
 * Sample Endpoint: http://localhost:3000/github-user-bio
 */
function getUserBio(githubPublicData) {
  let { fullName, joinedOn, email } = githubPublicData;
  return { fullName, joinedOn, email };
}
app.get("/github-user-bio", (req, res) => {
  let userBio = getUserBio(githubPublicData);
  res.json(userBio);
});
/**
 * Exercise 6: Repository URL
 * Sample Endpoint: http://localhost:3000/github-repo-url?repoName=backend_course
 */
function getRepoUrl(githubPublicData, repoName) {
  return `https://github.com/${githubPublicData.username}/${repoName}`;
}
app.get("/github-repo-url", (req, res) => {
  let repoName = req.query.repoName;
  let repoUrl = getRepoUrl(githubPublicData, repoName);
  res.json({ repoUrl: repoUrl });
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
