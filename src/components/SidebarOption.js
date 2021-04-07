import React from "react";
import "../styles/SidebarOption.css";
import Body from "./Body";
import { useStateProviderValue } from "../context/stateProvider";

function SidebarOption({ playlist, title, Icon }) {
  const [{ spotify }, dispatch] = useStateProviderValue();

  const showPlaylist = () => {
    spotify.getPlaylist(playlist.id).then((response) => {
      dispatch({
        type: "SET_PLAYLIST_FOCUS",
        playlist: response,
      });

      <Body playlist={response} />;
    });
  };

  return (
    <div className='sidebarOption'>
      {Icon && <Icon className='sidebarOption__icon' />}
      {Icon ? <h4>{title}</h4> : <p onClick={showPlaylist}>{title}</p>}
    </div>
  );
}

export default SidebarOption;
