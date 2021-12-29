import React, {Component} from "react";
import GridComponent from "./GridComponent";
import checkWinner from "../../helper-functions/checkWinner";
import {connect} from 'react-redux';
import ToLeaderBoard from "./ToLeaderBoard";
import ToMatchHistory from "./ToMatchHistroy";
import postToServer from "../../helper-functions/postToServer";


const mapStateToProps = state => (
  {
    board: state.board,
    turns: state.turnsPlayed,
    isRedsTurn: state.isRedsTurn
  }
)
class BoardContainer extends Component {
  componentDidUpdate (){
    let copyOfBoard = []
    for(let arr of this.props.board){
      copyOfBoard.push(arr.slice())
    }
    if(checkWinner(copyOfBoard)){
      let redPlayer = document.getElementById('redPlayerName').value
      let yellowPlayer = document.getElementById('yellowPlayerName').value

      if(redPlayer === ''){ redPlayer = 'guest'}
      if(yellowPlayer === ''){ yellowPlayer = 'guest'}
      
      const winner = this.props.isRedsTurn ? 'yellow' : 'red'
      postToServer(redPlayer, yellowPlayer, this.props.turns, winner)
      alert('winner')
    }
  }
  render() {
    const grid = [];
    for(let y = 6; y >= 0; y--){
      const row = [];
      for(let x = 0; x < 7; x++){
        row.push(<GridComponent x = {x} y = {y} key = {x}></GridComponent>)
      }
      grid.push(<div className = "row" key = {y}>{row}</div>)
    }
    return(
      <div className = "BoardContainer">
        <input type = 'text' id = 'redPlayerName'></input>
        <input type = 'text' id = 'yellowPlayerName'></input>
        {grid}
        <ToLeaderBoard></ToLeaderBoard>
        <ToMatchHistory></ToMatchHistory>
      </div>
    )
  }
}

export default connect(mapStateToProps, null) (BoardContainer);