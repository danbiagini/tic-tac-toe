import React from 'react';

import {  ProgressBar, Image } from 'react-bootstrap';
import julietSq from './squares/20170531_juliet-author.png'
import vjbSq from './squares/vjb-headshot.png'


function Square(props) {
  var val = props.value;
  if (props.value === 'X') {
    val = <Image responsive alt="juliet" src={julietSq}/>
  } else if (props.value === 'O') {
    val = <Image responsive alt="vince" src={vjbSq}/>
  }

  return (
    <button className="square" onClick={props.onClick}>
    {val}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="board">
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Timer extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      timer: props.turnTimer
    }
    this.onExpire = props.onExpire
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.onTick(), 1000);
  }
  onTick() {
    this.setState(
      (prev, props) => {
        var t = prev.timer - 1;
        if (t < 1) {
          t = 0;
        }
        return({timer: t});
      }
      );

    if (this.state.timer < 1 && this.onExpire) {
      this.onExpire();
    }

  }

  render () {

    var left = this.state.timer;
    var prog = (left / this.props.turnTimer) * 100;

    // console.log("total:" + this.props.startTime + ", left:" + left);
    return(
      <div>
      <h3>Tic Toc</h3>
      <ProgressBar label={left} now={prog} />
      {left < 1 &&
        <h3>Times Up!</h3>
      }
      </div>
    );
  }
}

export {Board, Timer}
