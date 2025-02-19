require('dotenv').config();
const express = require('express');
const { getAuthUrl, setAccessToken, spotifyApi } = require('./spotify/spotify_auth');
const { getSpotifySongs, getPlaylistDetails, } = require('./spotify/spotify_fetch');

(async () => {
  const open = (await import('open')).default;
  const app = express();
  const port = 8888;

  app.get('/login', (req, res) => {
    const authUrl = getAuthUrl();
    res.redirect(authUrl);
  });

  app.get('/callback', async (req, res) => {
    const code = req.query.code;
    try {
      await setAccessToken(code);
      res.send('Successfully authenticated with Spotify! You can close this window.');
      
      const playlistsID = '6ONkxV6K3kQrTLOW6uyIfa'

      await getPlaylistDetails(playlistsID);
      const songs = await getSpotifySongs(playlistsID); 

      
    } catch (error) {
      console.error('Error setting access token:', error);
      res.status(500).send('Error authenticating with Spotify');
    }
  });

  app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('Opening browser for Spotify authentication...');
    await open(`http://localhost:${port}/login`);
  });
})();
