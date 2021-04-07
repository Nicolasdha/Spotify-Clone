import React from "react";
import "../styles/SongRow.css";
import millisToMinutesAndSeconds from "../selectors/MilliToMinues";

function SearchSongRow({ track, playSong, album, index }) {
  return (
    <div className='songRow' onClick={() => playSong(track.id)}>
      <div className='songRow__index'>{index + 1}</div>
      <img
        className='songRow__album--img'
        src={track.album.images[0].url}
        alt=''
      />

      <div className='songRow__info'>
        <div className='songRow__trackartist'>
          <h1 className='songRow__track'>{track.name}</h1>
          <p className='songRow__artist'>
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>

        <p className='songRow__album'>{track.album.name}</p>
        <p className='songRow__dateAdded'>{track.album.release_date}</p>
        <p className='songRow__duration'>
          {millisToMinutesAndSeconds(track.duration_ms)}
        </p>
      </div>
    </div>
  );
}

export default SearchSongRow;
