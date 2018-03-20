import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import { Jumbotron, Table, Grid, Row, Col, PageHeader,
        Thumbnail, Image } from 'react-bootstrap';

import Header from './Header';
import { Board, Timer } from './Board';
import GameSetup from './Setup';
import Players from './Players'

class Scoreboard extends React.Component {

    render () {
      var p1 = this.props.player1 ?
        (<Image alt={this.props.player1}
            src={Players[this.props.player1].thumb} />) :
        ("");
      var p2 = this.props.player2 ?
        <Image alt={this.props.player2} src={Players[this.props.player2].thumb} /> :
        "";

      return (
        <Grid>
          <Row>
            <Col sm={4} />
            <Col sm={4}>
              <h4>Scoreboard</h4>
            </Col>
            <Col sm={4}/>
          </Row>
          <Row>
            <Col sm={12}>
              <Table>
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{p1}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>{p2}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>);
    }
}

class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      history: [{squares: Array(9).fill(null),}],
      xIsNext: true,
      winner: null,
      step: 0,
      player1: null,
      player2: null,
      setupComplete: false,
      settings: {
        turnTimer: 30,
        bestOf: 5,
      },
    };
    this.hdr = "Three Smooches";
  }

  getStatus () {
    if (this.state.winner) {
      return(<div>{'Winner:' + this.state.winner}</div>);
    } else {
      return(<div>{'Next player: ' +
        (this.state.xIsNext ?
         this.state.player1 :
         this.state.player2)}</div>);
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

    if (!this.state.setupComplete) {
      main = <GameSetup
                player1={this.state.player1}
                player2={this.state.player2}
                playerChange={(p1, p2) => {
                  var complete = false;
                  if (p1 && p2) {
                    complete = true;
                  }
                  this.setState({
                    player1: p1,
                    player2: p2,
                    setupComplete: complete,
                  });
                }} />
      // if (!this.state.settings.player1) {
      //   main = this.renderSetup('Player 1');
      // } else {
      //   main = this.renderSetup('Player 2');
      // }
    } else {
      main = this.renderPlay();
    }

    return (
      <div>
        <Header hdr={this.hdr}
                settings={this.state.settings}
                settingsChange={this.handleSettings}/>
        <Grid fluid>
          <Scoreboard
            player1={this.state.player1}
            player2={this.state.player2}
            bestOf={this.state.settings.bestOf}/>
          <Jumbotron>
            {main}
          </Jumbotron>
        </Grid>
      </div>);
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
              p1={Players[this.state.player1]}
              p2={Players[this.state.player2]}
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
    squares[i] = this.state.xIsNext ? this.state.player1 : this.state.player2;
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
