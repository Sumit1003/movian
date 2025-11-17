import express from "express";
import axios from "axios";
import { load } from "cheerio";   // ✅ FIXED

const router = express.Router();

router.get("/:provider/:imdb", async (req, res) => {
  try {
    const { provider, imdb } = req.params;

    let targetURL = "";

    switch (provider) {
  case "vidsrc":
    targetURL = `https://vidsrc.to/embed/movie/${imdb}`;
    break;

  case "vidsrcxyz":
    targetURL = `https://vidsrc.xyz/embed/movie/${imdb}`;
    break;

  case "vidsrcme":
    targetURL = `https://vidsrc.me/embed/movie/${imdb}`;
    break;

  case "vidsrcpro":
    targetURL = `https://vidsrc.pro/embed/movie/${imdb}`;
    break;

  case "multiembed":
    targetURL = `https://multiembed.mov/?video_id=${imdb}`;
    break;

  case "moviesapi":
    targetURL = `https://moviesapi.club/movie/${imdb}`;
    break;

  case "2embed":
    targetURL = `https://www.2embed.to/embed/${imdb}`;
    break;

  case "2embedcc":
    targetURL = `https://2embed.cc/embed/${imdb}`;
    break;

  case "smashystream":
    targetURL = `https://player.smashystream.com/e/${imdb}`;
    break;

  case "databasegdriveplayer":
    targetURL = `https://databasegdriveplayer.xyz/player.php?imdb=${imdb}`;
    break;

  case "sflix":
    targetURL = `https://sflix.to/embed/movie/${imdb}`;
    break;

  case "vtube":
    targetURL = `https://vtube.to/embed/movie/${imdb}`;
    break;

  case "ymovies":
    targetURL = `https://ymovies.tv/embed/movie/${imdb}`;
    break;

  case "cinezone":
    targetURL = `https://cinezone.to/embed/movie/${imdb}`;
    break;

  case "fmovies":
    targetURL = `https://fmovies.to/embed/movie/${imdb}`;
    break;

  case "movieweb":
    targetURL = `https://movie-web.app/embed/movie/${imdb}`;
    break;

  case "streamtape":
    targetURL = `https://streamtape.com/e/${imdb}`;
    break;

  case "doodstream":
    targetURL = `https://doodstream.com/e/${imdb}`;
    break;

  case "mixdrop":
    targetURL = `https://mixdrop.com/e/${imdb}`;
    break;

  case "upstream":
    targetURL = `https://upstream.to/embed/${imdb}`;
    break;

  case "voe":
    targetURL = `https://voe.sx/e/${imdb}`;
    break;

  case "filemoon":
    targetURL = `https://filemoon.sx/e/${imdb}`;
    break;

  case "vidlink":
    targetURL = `https://vidlink.pro/embed/movie/${imdb}`;
    break;

  case "vidsrcin":
    targetURL = `https://vidsrc.in/embed/movie/${imdb}`;
    break;

  case "vidsrcembed":
    targetURL = `https://vidsrc.embed.workers.dev/movie/${imdb}`;
    break;

  case "vidsrcplus":
    targetURL = `https://vidsrcplus.vercel.app/embed/movie/${imdb}`;
    break;

  case "embedsito":
    targetURL = `https://embedsito.com/embed/movie/${imdb}`;
    break;

  case "embedss":
    targetURL = `https://embedss.com/embed/movie/${imdb}`;
    break;

  case "superembed":
    targetURL = `https://superembed.stream/embed/movie/${imdb}`;
    break;

  case "autoembed":
    targetURL = `https://autoembed.co/movie/${imdb}`;
    break;

  case "watchx":
    targetURL = `https://watchx.stream/embed/movie/${imdb}`;
    break;
    
      default:
        return res.status(400).json({
          success: false,
          message: "Unknown provider",
        });
    }

    // Fetch HTML
    const response = await axios.get(targetURL, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = load(response.data); // <-- working cheerio import

    // Send HTML back
    res.send($.html());

  } catch (err) {
    console.error("Embed Proxy Error:", err.message);

    res.status(500).send(`
      <h2 style="color:white;background:#111;padding:20px;text-align:center;">
        Player failed. Try another server.
      </h2>
    `);
  }
});

export default router;
