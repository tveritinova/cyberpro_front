import React from "react";
import axios from "axios";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Tournaments from "./Tournaments";
import Home from "./Home";
import Game from "./Game";


export default class App extends React.Component {

  render () {
    return (
      <HashRouter>
        <div>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path='/game/:game_name' component={GameMatch} />
          </div>
        </div>
      </HashRouter>

    );
  }
}

const GameMatch = ({match}) => {
  console.log("game match", match.params);
  return (<Game name={match.params.game_name} />);
};
