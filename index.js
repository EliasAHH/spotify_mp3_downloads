require("dotenv").config();
const spotifyWebApi = require("spotify-web-api-node");
const ytsr = require("ytsr");
const { exec } = require("fs-extra");
const fs = require("fs-extra");
const downloadsPath = require("./downloads_path");
const SpotifyWebApi = require("spotify-web-api-node");
const { fstat } = require("fs");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirecturi: "http://localhost:8888/callback",
});

let outputFolder = downloadsPath;

const authenticateSpotify = async () => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body["access_token"]);
  } catch (err) {
    console.error("Error authenticating with Spotify", err);
  }
};

const getSpotifySongs = async () => {
  let songs = [];
  let offset = 0;
  let limit = 20;

  while (true) {
    try {
      const response = await spotifyApi.getMySavedTracks({ limit, offset });
      if (response.body.items.length === 0) break;

      response.body.items.forEach((item) => {
        console.log(item);
      });
    } catch (err) {
      console.log("Error fetching songs", err);
      break;
    }
  }
};

const main = async () => {
  await authenticateSpotify();

  const songs = await getSpotifySongs();
};

main();
