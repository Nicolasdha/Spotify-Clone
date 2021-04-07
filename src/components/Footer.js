import React, { useEffect, useState } from "react";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import { Grid, Slider } from "@material-ui/core";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import "../styles/Footer.css";
import { useStateProviderValue } from "../context/stateProvider";

function Footer() {
  const [
    { item, playing, spotify, repeat },
    dispatch,
  ] = useStateProviderValue();
  // console.log(token);
  // console.log("item", item);
  // console.log(spotify);
  // console.log(spotify.play);
  // console.log(spotify.skipToNext);
  const [isActive, setActive] = useState("false");

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((response) => {
      dispatch({
        type: "SET_PLAYING",
        playing: response.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: response.item,
      });
    });
  }, [spotify, dispatch]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause().then(() => {
        spotify.getMyCurrentPlayingTrack().then((response) => {
          dispatch({
            type: "SET_ITEM",
            item: response.item,
          });

          dispatch({
            type: "SET_PLAYING",
            playing: false,
          });
        });
      });
    } else {
      spotify.play().then(() => {
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
    }
  };

  const skipNext = () => {
    spotify.skipToNext().then(() => {
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

  const skipPrevious = () => {
    spotify.skipToPrevious().then(() => {
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

  const setVolume = (e) => {
    if (typeof e.target.ariaValueNow === "string") {
      spotify.setVolume(e.target.ariaValueNow);
    }
  };

  const setRepeat = () => {
    if (repeat !== "track") {
      dispatch({
        type: "SET_REPEAT",
        repeat: "track",
      });
    } else {
      dispatch({
        type: "SET_REPEAT",
        repeat: "off",
      });
    }
    spotify.setRepeat(repeat);

    setActive(!isActive);
  };

  return (
    <div className='footer'>
      <div className='footer__left'>
        <img
          className='footer__albumLogo'
          src={item && item.album.images[0].url}
          alt={item && item.name}
        />
        {item ? (
          <div className='footer__songInfo'>
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(",")}</p>
          </div>
        ) : (
          <div className='footer__songInfo'>
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className='footer__center'>
        <ShuffleIcon className='footer__green' />
        <SkipPreviousIcon onClick={skipPrevious} className='footer__icon' />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize='large'
            className='footer__icon'
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize='large'
            className='footer__icon'
          />
        )}

        <SkipNextIcon onClick={skipNext} className='footer__icon' />
        <RepeatIcon
          onClick={setRepeat}
          className={isActive ? "footer__green" : "footer__icon "}
        />
      </div>
      <div className='footer__right'>
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider
              defaultValue={100}
              aria-labelledby='continuous-slider'
              onChange={setVolume}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
