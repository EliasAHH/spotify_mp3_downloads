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
  redirecturl: "http://localhost:8888/callback",
});

let outputFolder = downloadsPath;

const authenticateSpotify = async () => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    console.log(data.body);
    spotifyApi.setAccessToken(data.body["access_token"]);
  } catch (err) {
    console.error("Error authenticating with Spotify", err);
  }
};
