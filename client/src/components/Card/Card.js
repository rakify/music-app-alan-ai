import React from "react";
import Player from "../Player/Player";

// import css
import "./Card.css";

export default function Card({ cardData, alanBtnRef }) {
  return (
    <div className="p-0 m-0 mt-5" style={{ flex: 1 }}>
      <div className="custom-card  container">
        <img
          src={cardData.thumbnailUrl}
          className="custom-card-img "
          alt="card "
        />
        <div className="card-body">
          {/* background ma image mukva nu 6 like amazon player */}
          <p className="card-text">{cardData.title}</p>
        </div>
      </div>

      <Player playerSongData={cardData} alanBtnRef={alanBtnRef} />
    </div>
  );
}
