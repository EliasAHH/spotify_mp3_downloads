const path = require("path");
const os = require("os");
const { execSync } = require("child_process");
const fs = require("fs");

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

const downloadsPath = () => {
  if (isWSL()) {
    const winHome = getWindowsHomeInWSL();
    if (winHome) {
      return path.join("/mnt/c", winHome.substring(3), "Downloads");
    } else {
      console.error("Failed to determine Windows home directory.");
      process.exit(1);
    }
  } else {
    return path.join(os.homedir(), "Downloads");
  }
};

module.exports = downloadsPath;
