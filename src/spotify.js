// state://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

// Direct user to spotify auth on button click
export const authEndpoint = "https://accounts.spotify.com/authorize";

// Once auth they will be redirected
const redirectUri = "http://localhost:3000/";

const clientId = "411a340581964ab5beedbeae30b75163";

// Permissions of 3rd party app
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-read-private",
];

// once auth give me back a token which is a pass
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      // console.log("initial", initial);
      // console.log("item", item);
      // console.log("parts", parts);
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

/* Once confirm you will get the token in the url: http://localhost:3000/#access_token=BQDV52mSu6k7SoHUlqUtclnC_vMKp5ewGDdd_G90WJjx5Kz0LWroRsMSWRhcE4Znzr6X6Z-STJbRj4szv_YVpwGJRkbJjAbZdyjUXIiDnZYLM3Yd1MqHLEQowHG6pCtMjXGOwrjlzcVvJFYSle-CL8hvIzkd8pmKKI38YgKLT8nsRdEx&token_type=Bearer&expires_in=3600

To get the access token from the url we : window.location.hash.substring(1).split(&)

1) go to has 
2) substring to get 1 index past hash so 1 char past hash
3) split at & to get nothing from & on on the back half
4) reduce with the initial value and the item everytime it loops thru (only once) it will split it at the = past access_token
5) initial[parts[0]] and the access_token is part[0] so just the 
6) use the built in component decodeURIComponent
    - go into the initial array being returned from reduce, for the access token decode the uri component (the token itself) which we we pass in using parts[1] which is the token itself
7) return initial
8) close reduce function
9) provide the initial value as an empty obj before closing the reduce call
*/
