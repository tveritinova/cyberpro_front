import React from "react";
import axios from "axios";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

class Home extends React.Component {

  componentDidMount() {
    const self = this;
    const myApi = axios.create({
      baseURL: 'http://localhost:4080/',
      timeout: 10000,
      transformRequest: [(data) => data],
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    myApi.get('/games')
    .then(response => {
      self.setState({data: response.data});
      //console.log(response.data['games']);
    })
    .catch(error => {console.log('error'); console.log(error)});
  }

  render() {
    if (this.state) {
      //console.log(this.state.data['games'].map(function (game, i) {return game; }));
    }
    return (
    <div>
      <div className="title">Welcome to <b>CYBERPRO</b> portal!</div>
      <div>
        {this.state && this.state.data &&
        <div className="game_table">
        {this.state.data['games'].map(function (game, i) {
          var str1 = '/game/';
          var str2 = game['name'];
          var res = str1.concat(str2);
          console.log(res);
          return(<NavLink to={res} key={i} params={{id : game['id']}}><button  className="game_cell" id={game['name']}>{game['name']}</button></NavLink>);
        })}
        </div>}
      </div>
    </div>
    )
  }
}

export default Home;
