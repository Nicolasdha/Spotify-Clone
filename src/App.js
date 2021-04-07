import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

import "./App.css";
import Login from "./components/Login";
import Player from "./components/Player";
import { getTokenFromUrl } from "./spotify";
import { useStateProviderValue } from "./context/stateProvider";

function App() {
  const [{ token }, dispatch] = useStateProviderValue();

  const spotify = new SpotifyWebApi();
  console.log(spotify);
  useEffect(() => {
    // Set spotify global
    dispatch({
      type: "SET_SPOTIFY",
      spotify,
    });

    //Set Token
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const token = hash.access_token;

    if (token) {
      dispatch({
        type: "SET_TOKEN",
        token,
      });

      spotify.setAccessToken(token);

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        console.log(playlists);
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });

      spotify.getPlaylist("37i9dQZF1E38ktlZ9j5tJi").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );
    }
  }, [token, dispatch]);

  return <div className='app'>{token ? <Player /> : <Login />}</div>;
}

export default App;
