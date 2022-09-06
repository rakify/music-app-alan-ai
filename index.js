const express = require("express");
const Youtube = require("youtube-sr").default;
const ytdl = require("ytdl-core");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

//use
app.use(cors());
app.use(express.json());

app.post("/search", async (req, res) => {
  try {
    const musics = await Youtube.search(req.body.title+"audio", {
      type: "video",
      limit: 5,
      safeSearch: true,
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
    res.status(200).json({ data: finalData });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => console.log(`running on ${port}`));
