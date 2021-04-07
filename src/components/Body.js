import React from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import "../styles/Body.css";
import Header from "./Header";
import { useStateProviderValue } from "../context/stateProvider";
import SongRow from "./SongRow";
import SearchSongRow from "./SearchSongRow";
import millisToMinutesAndSeconds from "../selectors/MilliToMinues";

function Body() {
  const [
    { discover_weekly, spotify, item, playlistFocus, search },
    dispatch,
  ] = useStateProviderValue();

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
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
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
              <strong className='body__searchResults'>Search Results</strong>
              <div className='body__titles'>
                <div className='body__titles--index '>#</div>
                <div className='body__titles--trackartist'>TITLE</div>
                <div className='body__titles--album'>ALBUM</div>
                <div className='body__titles--dateAdded'>DATE ADDED</div>
                <div className='body__titles--duration'>LENGTH</div>
              </div>
              <hr className='body--hr'></hr>
              {search.tracks.items.map((song, i) => {
                return (
                  <SearchSongRow
                    playSong={playSong}
                    track={song}
                    album={song.album}
                    key={i}
                    index={i}
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
                  : item && item.album.images[0].url
              }
              alt=''
            />
            <div className='body__infoText'>
              <strong>PLAYLIST</strong>
              <h2 className='body__header'>
                {!playlistFocus
                  ? discover_weekly && discover_weekly.name
                  : playlistFocus.name}
              </h2>
              <p>
                {!playlistFocus
                  ? discover_weekly && discover_weekly.description
                  : playlistFocus.description}
              </p>
              <span className='body__owner'>
                {!playlistFocus
                  ? discover_weekly && discover_weekly.owner.display_name
                  : playlistFocus.owner.display_name}
              </span>
              <span className='body__songTotal'>
                {!playlistFocus
                  ? discover_weekly &&
                    ` - ${
                      discover_weekly.tracks.total
                    } songs, ${millisToMinutesAndSeconds(
                      discover_weekly.tracks.items.reduce(
                        (initial, current) =>
                          initial + current.track.duration_ms,
                        0
                      )
                    )} min`
                  : ` - ${
                      playlistFocus.tracks.total
                    } songs,  ${millisToMinutesAndSeconds(
                      playlistFocus.tracks.items.reduce(
                        (initial, current) =>
                          initial + current.track.duration_ms,
                        0
                      )
                    )} min`}
              </span>
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
            <div className='body__titles'>
              <div className='body__titles--index '>#</div>
              <div className='body__titles--trackartist'>TITLE</div>
              <div className='body__titles--album'>ALBUM</div>
              <div className='body__titles--dateAdded'>DATE ADDED</div>
              <div className='body__titles--duration'>LENGTH</div>
            </div>
            <hr className='body--hr'></hr>

            {!playlistFocus
              ? discover_weekly &&
                discover_weekly.tracks.items.map((song, i) => (
                  <SongRow
                    playSong={playSong}
                    track={song.track}
                    key={i}
                    index={i}
                  />
                ))
              : playlistFocus.tracks.items.map((song, i) => {
                  return (
                    <SongRow
                      playSong={playSong}
                      index={i}
                      track={song.track}
                      key={i}
                    />
                  );
                })}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default Body;
