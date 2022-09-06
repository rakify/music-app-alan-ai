import React, { useState } from "react";

// import card
import Card from "../Card/Card";

// import css
import "./SongList.css";

export default function SongList({
  allSongDataList,
  songIndex,
  isSongPlaying,
  alanBtnRef,
}) {
  //

  //
  return (
    <>
      <div style={{ display: "flex" }}>
        {/*  */}
        {songIndex && isSongPlaying ? (
          <Card
            cardData={allSongDataList[songIndex - 1]}
            alanBtnRef={alanBtnRef}
          />
        ) : null}
        {/*  */}
        <div className="container mt-5" style={{ flex: 1 }}>
          <table className="table table-dark ">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Song Name</th>
              </tr>
            </thead>
            <tbody>
              {allSongDataList ? (
                allSongDataList.map((ls, index) => {
                  return (
                    <tr key={ls.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{ls.title}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th></th>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
          <h6 style={{ color: "green" }}>
            Available Commands: play song number 1, change, pause, stop
          </h6>
        </div>
      </div>
    </>
  );
}
