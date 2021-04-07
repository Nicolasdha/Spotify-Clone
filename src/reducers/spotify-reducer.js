export const initialState = {
  user: null,
  //change to null after devloping
  token: null,
  playlists: [],
  playing: false,
  item: null,
  spotify: null,
  discover_weekly: null,
  top_artists: null,
  playlistFocus: null,
  search: null,
  rendered: null,
  repeat: "off",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      };
    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };
    case "SET_TOP_ARTISTS":
      return {
        ...state,
        top_artists: action.top_artists,
      };
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };
    case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };
    case "SET_PLAYLIST_FOCUS":
      return {
        ...state,
        playlistFocus: action.playlist,
      };
    case "SEARCH_QUERY":
      return {
        ...state,
        search: action.search,
      };
    case "SET_REPEAT":
      return {
        ...state,
        repeat: action.repeat,
      };

    default:
      return state;
  }
};

export default reducer;
