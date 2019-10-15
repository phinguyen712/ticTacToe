import React from 'react';
import {winningConditions, boardMap}from './helper/ticTacToeHelper';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Button
} from 'react-native';
import styles from './Main.style';

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boardMap: boardMap(),
      playerTurn: 1,
      winner: null, // 1: player 1, 2: player 2, 3: tie
      player1Score: 0,
      player2Score: 0,
      startingPlayer:1,
      turnsRemaining: 9,
    }
  }

  onPressCell(row, col) {
    const {winner, turnsRemaining, player1Score, player2Score, playerTurn, boardMap} = this.state;
    const newBoardState = [...this.state.boardMap];

    if(winner) {
      return;
    }

    if(!this.state.boardMap[row][col]) {
      newBoardState[row][col] = playerTurn;
      
      this.setState({boardMap: newBoardState});
      
      if (winningConditions(boardMap)) {
        this.setState({winner: playerTurn})
        if(playerTurn === 1) { 
          this.setState({player1Score: player1Score + 1});
        } else {
          this.setState({player2Score: player2Score + 1});
        }
        return;
      }
      
      if(turnsRemaining === 1) {
        // no turns left, tie
        this.setState({winner: 3});
      } 
      this.setState({turnsRemaining: turnsRemaining - 1})
      this.switchPlayer();
    }
  }

  switchPlayer() {
    if(this.state.playerTurn === 1) {
      this.setState({playerTurn: 2})
    } else {
      this.setState({playerTurn: 1})
    }
  }

  nextGame() {
    const newStartingPlayer = this.state.startingPlayer === 1 ? 2: 1;
    
    this.setState({
      winner: null,
      boardMap: boardMap(),
      playerTurn: newStartingPlayer,
      startingPlayer: newStartingPlayer,
      turnsRemaining: 9
    });
  }
  
  restart(){
    this.setState({ 
      player1Score: 0,
      player2Score: 0
    });
    this.nextGame();
  }

  renderWinnerMessage() {
    const {winner} = this.state;

    if(winner) {
      return (
        <View style={styles.winnerContainer}>
          <Text>{winner === 3 ? 'Tie' : `Player ${winner} WINS!!!`}</Text>
          <View style={styles.winnerButton}>
            <Button title='Next Game' accessibilityLabel='Next game' onPress={this.nextGame.bind(this)}/>
          </View>
        </View>
      );
    }
  }

  renderBoard() {
    return this.state.boardMap.map((row, index) => {
      return <View key={index} style={{flexDirection:'row' }}>{this.renderColumn(row, index)}</View>;
    });
  }

  renderColumn(row, rowIndex) {
    return row.map((cell, colIndex) => {
        return (
          <TouchableOpacity key={colIndex} style={styles.cell} onPress={this.onPressCell.bind(this, rowIndex, colIndex)}>
            {this.renderXO(cell)}
          </TouchableOpacity>
        )
    });
  }

  renderXO(content){
    if(!content) {
      return 
    } else if(content === 1) {
      return <Text adjustsFontSizeToFit minimumFontScale={1}  style={styles.XIcon}>X</Text>
    } else if(content === 2) {
      return <Text adjustsFontSizeToFit minimumFontScale={1}  style={styles.OIcon}>O</Text>
    }
  }

  render() {
    const {player1Score, player2Score, playerTurn} = this.state;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.scoreContainer}>
          <Text>player 1:{player1Score}</Text>
          <Text>player 2:{player2Score}</Text>
          <View style={styles.restartButton}>
            <Button title='Restart' accessibilityLabel='Next game' onPress={this.restart.bind(this)}/>
          </View>
        </View>
        {this.renderXO(playerTurn)}
        {this.renderBoard()}
        <View style={styles.winnerPlaceHolder}>
        {this.renderWinnerMessage()}
        </View>
      </View>
    );
  }
}