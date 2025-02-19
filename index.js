require("dotenv").config();
const ytsr = require("ytsr");
const { exec } = require("fs-extra");
const fs = require("fs-extra");
const downloadsPath = require("./downloads_path");
const { fstat } = require("fs");
const getSpotifySongs = require("./spotify/spotify_fetch");

const main = async () => {
  const songs = await getSpotifySongs();
};

main();
