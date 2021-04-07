import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import "../styles/Header.css";
import { useStateProviderValue } from "../context/stateProvider";

function Header() {
  const [{ user, spotify }, dispatch] = useStateProviderValue();

  const searchChange = (e) => {
    if (e.target.value !== "") {
      spotify
        .search(e.target.value, ["album", "artist", "playlist", "track"])
        .then((response) => {
          dispatch({
            type: "SEARCH_QUERY",
            search: response,
          });
          console.log(response);
        });
    } else {
      dispatch({
        type: "SEARCH_QUERY",
        search: null,
      });
    }
  };
  return (
    <div className='header'>
      <div className='header__left'>
        <SearchIcon />
        <input
          placeholder='Search for Artists, Songs, and or Podcasts'
          type='text'
          onChange={searchChange}
        />
      </div>
      <div className='header__right'>
        <Avatar
          src={
            user && user.images.length !== 0 ? user.images[0].url : undefined
          }
          alt={user && user.display_name}
        />
        <h4>{user && user.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
