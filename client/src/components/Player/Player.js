import React, { useEffect, useState } from "react";
import ReactPlayer from "react-jinke-music-player";

// import css
import "react-jinke-music-player/assets/index.css";

export default function Player({ playerSongData, alanBtnRef }) {
  const [error, setError] = useState(false);
  const customDownloader = () => {
    const link = document.createElement("a");
    link.href = playerSongData.musicUrl;
    link.download = "song";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    error &&
      alanBtnRef.btnInstance.playText("Something Went Wrong Try Other") &&
      alanBtnRef.btnInstance.activate();
    setError(false);
  }, [error, alanBtnRef]);

  return (
    <>
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
        quietUpdate={true}
        onAudioAbort={() => setError(true)}
        onAudioError={() => setError(true)}
        clearPriorAudioLists={false}
        glassBg={true}
        mode={"full"}
        drag={false}
      />
    </>
  );
}
