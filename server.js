const express = require("express");
const open = require("open");
const { getAuthUrl, setAccessToken } = require("./spotify/spotify_auth");
const main = require("./index");
const { mainModule } = require("process");

const app = express();
const port = 8888;

app.get("/login", (req, res) => {
  res.redirect(getAuthUrl());
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  try {
    await setAccessToken(code);
    res.send("Login Successful you can now close the tab");
    await main();
  } catch (err) {
    console.error("Error getting access code token:", err);
    res.send("Error during authentication");
  }
});

app.listen(port, async () => {
  console.log(`Open this url to login: http://localhost:${port}/login`);
  await open(`http://localhost:${port}/login`);
});
