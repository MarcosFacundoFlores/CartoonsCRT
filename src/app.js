const express = require("express");
const app = express();
const { spawn } = require("child_process");
const fs = require("fs");

let player;
let playing = false;
let folder;

function getRandomVideo(subfolder) {
  const subfolderPath = `videos/${subfolder}`;
  const videoFiles = fs.readdirSync(subfolderPath);
  const randomIndex = Math.floor(Math.random() * videoFiles.length);
  return `${subfolder}/${videoFiles[randomIndex]}`;
}

function startPlaying() {
  if (playing) {
    return; // another video is already playing
  }

  playing = true;
  const randomVideo = getRandomVideo(folder);
  console.log(`Playing ${randomVideo}`);
  player = spawn("vlc", [
    `videos/${randomVideo}`,
    "--fullscreen",
    "--play-and-exit",
    "--no-video-title-show",
  ]);
  player.on("close", function () {
    playing = false;
    startPlaying(folder); // Start a new video when the current one ends
  });
}

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/play", function (req, res) {
  folder = req.query.folder;
  if (player) {
    player.kill();
  }
  startPlaying();
  res.send(`Playing ${folder}`);
});

app.listen(3000, function () {
  console.log("Server listening on port 3000");
});
