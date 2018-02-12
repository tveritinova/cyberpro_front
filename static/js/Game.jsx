import React from "react";
import axios from "axios";

class Game extends React.Component {

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
	    	var id = 0;
	    	response.data['games'].find((el, ind, arr) => {
	    		if (el['name'] == this.props.name) {
	    			id = el['id']
	    		}
	    	})
	      	myApi.get('/games/'+id+'/matches')
		    .then(response => {
		      self.setState({matches: response.data['matches']});
		    })
		    .catch(error => {console.log('error'); console.log(error)});
	    })
	    .catch(error => {console.log('error'); console.log(error)});

	    
	}

  render () {
  	var str = "game_";
  	var _id = str.concat(this.props.name);
  	if (this.state != null && this.state.matches != null) {
  		console.log(this.state.matches);
  	}
    return (
    <div className="game" id={_id}>
    	<div className="title_game">{this.props.name}</div>
    	<div>
    		{this.state && this.state.matches &&
	    	<table className="table">
	    		<thead>
			      <tr>
			        <th>tournament_id</th>
			        <th>first_team_id</th>
			        <th>second_team_id</th>
			        <th>num_in_stage</th>
			        <th>date</th>
			      </tr>
			    </thead>
	    		{this.state.matches.map((match, i) => {
	    		console.log(match['tournament_id']);
	    		return (
	    		<tbody>
	    			<tr>
	    				<th>{match['tournament_id']}</th>
	    				<th>{match['first_team_id']}</th>
	    				<th>{match['second_team_id']}</th>
	    				<th>{match['num_in_stage']}</th>
	    				<th>{match['date']}</th>
	    			</tr>
	    		</tbody>)})}
	    	</table>}
    	</div>
    </div>);
  }
}

export default Game;
