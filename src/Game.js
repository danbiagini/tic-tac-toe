import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';

import Header from './Header';
import { Board, Timer } from './Board';


class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      history: [{squares: Array(9).fill(null),}],
      xIsNext: true,
      winner: null,
      step: 0,
      settings: {
        player1: null,
        player2: null,
        turnTimer: 30,
      },
    };
    this.setupComplete = true;
    this.hdr = "Three Smooches";
  }

  getStatus () {
    if (this.state.winner) {
      return(<div>{'Winner:' + this.state.winner}</div>);
    } else {
      return(<div>{'Next player: ' + (this.state.xIsNext ? 'X' : 'O')}</div>);
    }
  }

  getMoves (history) {
    // const history = this.state.history;
    const current = history[this.state.step];

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#goToMove" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });
    return moves;
  }

  render() {
    var main;

    if (!this.setupComplete) {
      main = this.renderSetup();
    } else {
      main = this.renderPlay();
    }

    return (
      <div>
        <Header hdr={this.hdr}
                settings={this.state.settings}
                settingsChange={this.handleSettings}/>
        <Grid fluid>
          <Jumbotron>
            {main}
          </Jumbotron>
        </Grid>
      </div>);
  }

  renderSetup () {

  }

  renderPlay() {
    const history = this.state.history;
    const current = history[this.state.step];

    return (
      <Row>
        <Col sm={4}>
          {this.getStatus()}
          {this.getMoves(history)}
        </Col>
        <Col sm={4}>
          <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
          />
        </Col>
        <Col sm={4}>
          <Timer turnTimer={this.state.settings.turnTimer} />
        </Col>
      </Row>
    );
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.step + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.state.winner || squares[i]) {
        return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    var win = calculateWinner(squares);
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      step: history.length,
      winner: win,
    });
  }

  jumpTo(step) {
    this.setState({
      step: step,
      xIsNext: (step % 2) ? false : true,
    });
  }

  handleSettings = (e) => {
    console.log("got settings:" + e);
    this.setState(
      {
        settings: e
      }
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
