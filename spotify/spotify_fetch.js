const { spotifyApi } = require("./spotify_auth");

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
    return songs;
  }
};

module.exports = getSpotifySongs;
