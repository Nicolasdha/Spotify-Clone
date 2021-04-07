import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import "../styles/Sidebar.css";
import SidebarOption from "./SidebarOption";
import { useStateProviderValue } from "../context/stateProvider";

function Sidebar() {
  const [{ playlists, spotify }, dispatch] = useStateProviderValue();

  const homeReset = () => {
    spotify.getPlaylist("37i9dQZF1E38ktlZ9j5tJi").then((response) => {
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: response,
      });

      dispatch({
        type: "SET_PLAYLIST_FOCUS",
        playlist: null,
      });
    });
  };

  return (
    <div className='sidebar'>
      <img
        className='sidebar__logo'
        src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg'
        alt=''
      />
      <a onClick={homeReset}>
        <SidebarOption title='Home' Icon={HomeIcon} />
      </a>
      <SidebarOption title='Search' Icon={SearchIcon} />
      <SidebarOption title='Your Library' Icon={LibraryMusicIcon} />

      <br />
      <strong className='sidebar__title'>PLAYLISTS</strong>
      <hr />
      {playlists.length !== 0
        ? playlists.items.map((playlist, i) => (
            <SidebarOption key={i} playlist={playlist} title={playlist.name} />
          ))
        : "No Playlists"}
    </div>
  );
}

export default Sidebar;
