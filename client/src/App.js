import React, { useEffect, useRef, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import axios from "axios";

// import components
import SongList from "./components/SongList/SongList";

// import external css
import "./App.css";

const alanKey =
  "b9d07148a362087a4d192eba6b2cec532e956eca572e1d8b807a3e2338fdd0dc/stage";
axios.defaults.baseURL = "http://localhost:4000";

export default function App() {
  const alanBtnRef = useRef({}).current;
  const [songIndex, setSongIndex] = useState(0);
  const [allSongDataList, setAllSongDataList] = useState([]);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(allSongDataList);
  const [playerInstance, setPlayerInstance] = useState(null);

  const setCardDataFromAlanBtn = async (songNumber) => {
    try {
      const songIndex = wordsToNumbers(songNumber)
        ? wordsToNumbers(songNumber)
        : 0;
      setSongIndex(songIndex);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    allSongDataList.length > 0 &&
      alanBtnRef.btnInstance.activate() &&
      alanBtnRef.btnInstance.playText("Can You Please Select Song Number");
  }, [allSongDataList, alanBtnRef]);

  //console.log(allSongDataList[songIndex - 1]?.musicUrl);
  useEffect(() => {
    const fetchDataFromServer = async (songName) => {
      try {
        setLoading(true);
        alanBtnRef.btnInstance.playText("Wait Let's Play");
        alanBtnRef.btnInstance.deactivate();

        const response = await axios.post("/search", { title: songName });

        if (response.status === 200) {
          setLoading(false);
          setAllSongDataList(response.data.data);
        } else {
          alanBtnRef.btnInstance.playText("Sorry Try Other Song");
          alanBtnRef.btnInstance.activate();
        }
      } catch (err) {
        console.log(err);
      }
    };

    alanBtnRef.btnInstance = alanBtn({
      key: alanKey,
      onCommand: ({ command, songName, songNumber }) => {
        console.log("command = ", command);
        if (command === "play") {
          if (songName !== "else") {
            fetchDataFromServer(songName);
          }
        } else if (command === "startSong") {
          setCardDataFromAlanBtn(songNumber);
          setIsSongPlaying(true);
        } else if (command === "stop") {
          setAllSongDataList([]);
          setIsSongPlaying(false);
          setSongIndex(null);
        } else if (command === "change") {
          setIsSongPlaying(false);
          setSongIndex(null);
        } else if (command === "download") {
          window.open(`${allSongDataList[songIndex - 1]?.musicUrl}`, "_blank");
        }
      },
    });
  }, [alanBtnRef, songIndex, allSongDataList]);

  return (
    <div className="container-fluid p-0 m-0">
      {/* title */}
      <h1 className="title mt-3">Music Player AI</h1>

      {allSongDataList.length > 0 ? (
        <SongList
          allSongDataList={allSongDataList}
          songIndex={songIndex}
          isSongPlaying={isSongPlaying}
          setPlayerInstance={playerInstance}
        />
      ) : (
        <>
          <div className="mb-5 custom-model">
            <h3>Give Command Like</h3>
            <h6> Play Justin Bieber Songs</h6>
          </div>
        </>
      )}
      {loading && <p>Please wait...</p>}
    </div>
  );
}
