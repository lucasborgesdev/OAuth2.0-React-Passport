import React, {useContext} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Homepage from './Components/Homepage/Homepage';
import LoginPage from './Components/LoginPage/LoginPage';
import NavBar from './Components/NavBar/Navbar';
import  "./GlobalStyles.css"
import { myContext } from './Context';

function App() {
  const userObject = useContext(myContext);
  
  console.log(userObject);
  return (
    <BrowserRouter>
    <NavBar />
      <Switch>   
        <Route path="/" exact component={Homepage}/>
        <Route path="/login" component={LoginPage} />   
        </Switch>
    </BrowserRouter>
  );
}

export default App;
