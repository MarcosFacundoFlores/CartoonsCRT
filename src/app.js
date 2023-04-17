const express = require("express");
const app = express();
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

// Serve static files from the public directory
app.use(express.static("public"));

// Route that serves the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.get("/play", (req, res) => {

  var folder = req.query.folder;

  let player;

  function getRandomVideo(subfolder) {
    const subfolderPath = `videos/${subfolder}`;
    const videoFiles = fs.readdirSync(subfolderPath);
    // choose a random video file from the list
    const randomIndex = Math.floor(Math.random() * videoFiles.length);
    const randomVideo = videoFiles[randomIndex];

    return randomVideo;
  }

  function playVideo(subfolder) {
    const randomVideo = getRandomVideo(subfolder);
    console.log(`Playing ${randomVideo}`);
    player = spawn("vlc", [
      `videos/${subfolder}/${randomVideo}`,
      "--fullscreen",
      "--play-and-exit",
      "--no-video-title-show",
    ]);

    player.on("error", (err) => {
      console.error(`Failed to start child process: ${err}`);
    });

    player.on("close", () => {
      console.log(`VLC process exited`);
      player = null;
    });
  }

  
playVideo(folder)
})
