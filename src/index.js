import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import { Jumbotron, PageHeader, Navbar, Nav, NavItem,
        Grid, Row, Col, ProgressBar, MenuItem,
        NavDropdown, Form, FormGroup, FormControl,
        ControlLabel } from 'react-bootstrap';

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
    {props.value}
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

class Header extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedSetting: null,
    }
  }

  validateTimer() {
    if ((this.props.settings.turnTimer < 5) ||
        (this.props.settings.turnTimer > 120)) {
          return 'warning';
    }
    return 'success';
  }

  onCli = (e) => {
    console.log("click:" + e.type + ", input:" + this.input);
    this.input.focus();
  }

  onSel = (key, e) => {
    console.log("select:" + key + ", event:" + e.type);

    // this.setState({selectedSetting: key});
    e.preventDefault();
    // e.stopPropagation();
  }

  onToggle = (isOpen, e, src) => {
    console.log("toggler:" + isOpen + ", e:" + e.type + ", src:" + src.toString());
    if (!isOpen) {
      return false;
    }
  }
  render () {
    var s = this.props.settings;

    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">{this.props.hdr}</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavDropdown eventKey={1}
                        onSelect={this.onSel}
                        onToggle={this.onToggle}
                        title="Settings"
                        id="settings-dropdown">
            <MenuItem eventKey={1.1}
                      onClick={this.onCli}>
              <Navbar.Form>
                <FormGroup controlId="formSettings"
                            validationState={this.validateTimer()}>
                  <ControlLabel>Turn Timer</ControlLabel>
                  <FormControl type="number"
                                placeholder={s.turnTimer}
                                value={s.turnTimer}
                                inputRef={(ref) => { this.input = ReactDOM.findDOMNode(ref); }}
                                onChange={this.props.settingsChange}/>
                </FormGroup>
              </Navbar.Form>
          </MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={2} href="/">Reset Game</NavItem>
      </Nav>
      </Navbar>
    );
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
      settings: {
        turnTimer: 30,
      },
    };
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.step];
    let status;

    if (this.state.winner) {
      status = 'Winner:' + this.state.winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    var hdr = "Juliet and Vincent's Tic-Tac-Toe";
    return (
      <div>
      <Header hdr={hdr}
              settings={this.state.settings}
              settingsChange={this.handleSettings}/>
      <Grid fluid>
      <Jumbotron>
      <Row>
      <Col sm={4}>
        <div>{status}</div>
        <ol>{moves}</ol>
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
    </Jumbotron>
        </Grid>
      </div>
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

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
