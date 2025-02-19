require("dotenv").config();
const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: "http://localhost:8888/callback",
});

const scopes = [
  "user-library-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-private"
];

const getAuthUrl = () => {
  return spotifyApi.createAuthorizeURL(scopes);
};

const setAccessToken = async (code) => {
  const data = await spotifyApi.authorizationCodeGrant(code);
  spotifyApi.setAccessToken(data.body['access_token']);
  spotifyApi.setRefreshToken(data.body['refresh_token']);
};

module.exports = { spotifyApi, getAuthUrl, setAccessToken };
