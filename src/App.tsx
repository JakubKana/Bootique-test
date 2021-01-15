import React from "react";
import "./App.css";
import { Game, Login, Registration, TopPlayers } from "./pages";
import { Route, NavLink } from "react-router-dom";

const App = () => {
 
  return (
    <div className="App">
        <>
          <header className="nav-container">
            <ul className="nav">
              <li>
                <NavLink exact to="/">Home</NavLink>
              </li>
            
              <li>
                <NavLink exact to="/registration">Registration</NavLink>
              </li>
              <li>
                <NavLink exact to="/game">Game</NavLink>
              </li>
            </ul>
          </header>
          <Route path="/" exact component={TopPlayers}/>
         
          <Route path="/registration" exact component={Registration} />
          <Route path="/game" exact component={Game} />
        </>
    </div>
  );
};

{/* <li>
<NavLink exact to="/login">Login</NavLink>
</li> */}
{/* <Route path="/login" exact component={Login} /> */}

export default App;
