const express = require("express");
const Youtube = require("youtube-sr").default;
const ytdl = require("ytdl-core");
const cors = require("cors");
const ytMusic = require("node-youtube-music").default;
const path = require("path");

const app = express();
const port = process.env.PORT || 4000;

//use
app.use(cors());
app.use(express.json());

app.post("/search", async (req, res) => {
  try {
    const musics = await Youtube.search(req.body.title, {
      type: "video",
      limit: 3,
    });

    const filterData = musics.map(async (ls) => {
      const info = await ytdl.getInfo(
        `https://www.youtube.com/watch?v=${ls.id}`
      );

      const format = ytdl.chooseFormat(info.formats, { filter: "audioonly" });

      const thumbnailUrl = info.videoDetails.thumbnails;
      return {
        id: ls.id,
        title: ls.title,
        thumbnailUrl: thumbnailUrl[thumbnailUrl.length - 1].url,
        duration: ls.duration,
        musicUrl: format.url,
      };
    });

    var finalData = await Promise.all(filterData);

    finalData = finalData.slice(0, 3);
    console.log(finalData);
    res.status(200).json({ data: finalData });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => console.log(`running on ${port}`));
