require("dotenv").config();
const spotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirecturi: "http://localhost:8888/callback",
});

const scopes = ["user-library-read"];

const getAuthUrl = () => {
  return spotifyApi.createAuthorizeURL(scopes);
};

const setAccessToken = async (code) => {
  const data = await spotifyApi.authorizationCodeGrant(code);
  spotifyApi.setAccessToken(data.body["access-token"]);
  spotifyApi.setRefreshToken(data.body["refresh_token"]);
};

module.exports = { spotifyApi, getAuthUrl, setAccessToken };
