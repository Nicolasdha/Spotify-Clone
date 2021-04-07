import React from "react";
import "../styles/Login.css";
import { loginUrl } from "../spotify";

function Login() {
  // getTokenFromUrl(); maybe once use firebase?
  return (
    <div className='login'>
      <img
        className='login__logo'
        src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg'
        alt='Spotify Logo'
      />
      <a href={loginUrl}> LOGIN WITH SPOTIFY</a>
    </div>
  );
}

export default Login;
