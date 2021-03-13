import React from 'react';
import Google from '../../assets/Logo/Google.png';
import styles from './LoginPage.module.css';


const googleLogin = () => {
  window.open("http://localhost:4000/auth/google", "_self");
}


export default function LoginPage() {


  return(
    <div className={styles.loginPage}>
      <div className={styles.loginForm}>
          <h1>Login</h1>
      </div>
      <div className={styles.googleContainer} onClick={googleLogin}>
        <img src={Google} alt="Google Icon" />
        <p>Login with Google</p>
      </div>
    </div>
  )
}
