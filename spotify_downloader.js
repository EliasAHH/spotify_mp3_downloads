require("dotenv").config();
const spotifyWebApi = require("spotify-web-api-node");
const ytsr = require("ytsr");
const { exec } = require("fs-extra");
const path = require("path");
const os = require("os");
const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirecturl: "http://localhost:8888/callback",
});

let downloadsFolder = path.join(os.homedir(), "Downloads");

const isWSL = () => {
  try {
    return fs
      .readFileSync("/proc/version", "utf8")
      .toLowerCase()
      .includes("microsoft");
  } catch (e) {
    return false;
  }
};

const getWindowsHomeInWSL = () => {
  try {
    return execSync("cmd.exe /c echo %USERPROFILE%")
      .toString()
      .trim()
      .replace(/\\/g, "/");
  } catch (err) {
    console.log("Error getting windows home directory:", err);
    return null;
  }
};

if (isWSL()) {
  const winHome = getWindowsHomeInWSL();
  if (winHome) {
    downloadsFolder = path.join("/mnt/c", winHome.substring(3), "Downloads");
  } else {
    console.error("Failed to determine Windows home directory.");
    process.exit(1);
  }
} else {
  downloadsFolder = path.join(os.homedir(), "Downloads");
}
