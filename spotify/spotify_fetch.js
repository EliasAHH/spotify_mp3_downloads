const { spotifyApi } = require("./spotify_auth");

const getSpotifySongs = async (playlistId) => {
  let songs = [];
  let offset = 0;
  let limit = 100;

  while (true) {
    try {
      const response = await spotifyApi.getPlaylistTracks(playlistId, {
        offset: offset,
        limit: limit,
        fields: 'items(track(name,artists,album))'
      });

      if (response.body.items.length === 0) break;

      response.body.items.forEach((item) => {
        if (item.track) { 
          songs.push({
            name: item.track.name,
            artists: item.track.artists.map(artist => artist.name),
            album: item.track.album.name
          });
        }
      });

      offset += limit;
      
    } catch (err) {
      console.log("Error fetching playlist tracks:", err);
      break;
    }
  }
  return songs;
};

const getPlaylistDetails = async (playlistId) => {
  try {
    const playlist = await spotifyApi.getPlaylist(playlistId);
    console.log('Playlist Details:', {
      name: playlist.body.name,
      description: playlist.body.description,
      totalTracks: playlist.body.tracks.total,
      owner: playlist.body.owner.display_name
    });
  } catch (err) {
    console.log("Error fetching playlist details:", err);
  }
};

// use this code if you want to get all the user's playlist. We don't need this for now, we can add this later if need be. 
// const getUserPlaylists = async () => {
//   try {
//     const data = await spotifyApi.getUserPlaylists();
//     console.log('\nYour Playlists:');
//     data.body.items.forEach(playlist => {
//       console.log(`- ${playlist.name}`);
//       console.log(`  ID: ${playlist.id}`);
//       console.log(`  Tracks: ${playlist.tracks.total}`);
//       console.log('---');
//     });
//     return data.body.items;
//   } catch (err) {
//     console.log("Error fetching playlists:", err);
//     return [];
//   }
// };

module.exports = { getSpotifySongs, getPlaylistDetails };
