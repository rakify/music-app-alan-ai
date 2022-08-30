import React from "react";
import ReactPlayer from "react-jinke-music-player";
import alanbtn from "@alan-ai/alan-sdk-web";

// import css
import "react-jinke-music-player/assets/index.css";

export default function Player({ playerSongData }) {
  const customDownloader = () => {
    const link = document.createElement("a");
    link.href = playerSongData.musicUrl;
    link.download = "song";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <ReactPlayer
        audioLists={[
          {
            musicSrc: playerSongData.musicUrl,
            name: playerSongData.title,
            cover:
              "https://cdn.pixabay.com/photo/2012/04/13/20/45/record-33583_960_720.png",
          },
        ]}
        customDownloader={customDownloader}
        remove={true}
        onAudioAbort={() => console.log("Something Want Wrong Try Other")}
        onAudioError={() => console.log("Something Want Wrong Try Other")}
        clearPriorAudioLists={true}
        glassBg={true}
      />
    </div>
  );
}
