import React, { useState, useEffect } from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import "../styles/Body.css";
import Header from "./Header";
import { useStateProviderValue } from "../context/stateProvider";
import SongRow from "./SongRow";
import SearchSongRow from "./SearchSongRow";

function Body() {
  const [
    { discover_weekly, spotify, item, playlistFocus, search },
    dispatch,
  ] = useStateProviderValue();

  const [rendered, setRendered] = useState({});

  useEffect(() => {
    setRendered(playlistFocus);
    setRendered(discover_weekly);
  }, [playlistFocus, discover_weekly]);

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZF1E38ktlZ9j5tJi`,
      })
      .then((response) => {
        spotify.getMyCurrentPlayingTrack().then((response) => {
          dispatch({
            type: "SET_ITEM",
            item: response.item,
          });
          console.log(item);
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    console.log(id);
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((response) => {
        spotify.getMyCurrentPlayingTrack().then((response) => {
          dispatch({
            type: "SET_ITEM",
            item: response.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  return (
    <div className='body'>
      {search ? (
        <React.Fragment>
          <Header />
          <div className='body__info'>
            <div className='body__infoText'>
              <strong>Search Results</strong>

              {search.tracks.items.map((song, i) => {
                console.log("peep", song);
                return (
                  <SearchSongRow
                    playSong={playSong}
                    track={song}
                    album={song.album}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Header />
          <div className='body__info'>
            <img
              src={
                !playlistFocus
                  ? discover_weekly && discover_weekly.images[0].url
                  : item.album.images[0].url
              }
              alt=''
            />
            <div className='body__infoText'>
              <strong>PLAYLIST</strong>
              <h2>
                {!playlistFocus
                  ? discover_weekly && discover_weekly.name
                  : playlistFocus.name}
              </h2>
              <p>
                {!playlistFocus
                  ? discover_weekly && discover_weekly.description
                  : playlistFocus.description}
              </p>
            </div>
          </div>

          <div className='body__songs'>
            <div className='body__icons'>
              <PlayCircleFilledIcon
                className='body__shuffle'
                onClick={playPlaylist}
              />
              <FavoriteIcon fontSize='large' />
              <MoreHorizIcon />
            </div>

            {!playlistFocus
              ? discover_weekly &&
                discover_weekly.tracks.items.map((song, i) => (
                  <SongRow playSong={playSong} track={song.track} key={i} />
                ))
              : playlistFocus.tracks.items.map((song, i) => {
                  console.log("peep", song);
                  return (
                    <SongRow playSong={playSong} track={song.track} key={i} />
                  );
                })}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default Body;
