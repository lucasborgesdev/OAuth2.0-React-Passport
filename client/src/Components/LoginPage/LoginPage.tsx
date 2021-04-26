import React from 'react';
import googleImage from '../../assets/Logo/Google.png';
import githubImage from '../../assets/Logo/github.png';
import twitterImage from '../../assets/Logo/twitterImage.png';
import facebookImage from '../../assets/Logo/facebook-512.png';
import instagramImage from '../../assets/Logo/insta2.png';
import styles from './LoginPage.module.css';


const googleLogin = () => {
  window.open("http://localhost:4000/auth/google", "_self");
}

const githublogin = () => {
  window.open("http://localhost:4000/auth/github", "_self");
}

const twitterlogin = () => {
  //window.open("http://localhost:4000/auth/githublogin", "_self");
}
const facebooklogin = () => {
  window.open("http://localhost:4000/auth/facebook", "_self");
}

const instagramlogin = () => {
  window.open("http://localhost:4000/auth/instagram", "_self");
}



export default function LoginPage() {


  return(
    <div className={styles.loginPage}>
      <div className={styles.loginForm}>
          <h1>Login</h1>
      </div>
      <div className={styles.googleContainer} onClick={googleLogin}>
        <img src={googleImage} alt="Google Icon" />
        <p>Login with Google</p>
      </div>
      <div className={`${styles.googleContainer} ${styles.githubContainer}`} onClick={githublogin}>
        <img src={githubImage} alt="GitHub Icon" />
        <p>Login with GitHub</p>
      </div>
      <div className={`${styles.googleContainer} ${styles.twitterContainer}`} onClick={twitterlogin}>
        <img src={twitterImage} alt="Twitter Icon" />
        <p>Login with Twitter</p>
      </div>
      <div className={`${styles.googleContainer} ${styles.facebookContainer}`} onClick={facebooklogin}>
        <img src={facebookImage} alt="Twitter Icon" />
        <p className={styles.facebookText}>Login with Facebook</p>
      </div>
      <div className={`${styles.googleContainer} ${styles.InstagramContainer}`} onClick={instagramlogin}>
        <img src={instagramImage} alt="Twitter Icon" />
        <p className={styles.facebookText}>Login with Instagram</p>
      </div>
    </div>
  )
}
