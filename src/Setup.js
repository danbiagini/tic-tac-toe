import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import { Button, Image, Carousel, PageHeader } from 'react-bootstrap';

import Players from './Players';


class GameSetup extends React.Component {

  constructor(props) {
    super(props);
    this.players = [this.props.player1, this.props.player2];
    this.state = {
      direction: null,
      availPlayers: this.getAvailPlayers(),
      index: this.defaultItem(),
    };
  }

  getAvailPlayers () {
    var items = [];

    for (const k of Object.keys(Players)) {
      var p = Players[k];
      if (this.players[0] === k) {
        console.log("taking " + k + " out of items");
        continue;
      }
      items.push(p);
    }
    return items;
  }

  defaultItem () {
    var max = this.getAvailPlayers().length;
    console.log("found " + max + " players");
    var start = Math.floor(Math.random() * max);
    return (start);
  }
  // handleCarouselSelect = (i, e) => {
  //   console.log("i:" + i + ", dir:" + e.direction);
  //   this.setState({
  //     index: i,
  //     direction: e.direction,
  //   });
  // }

  updateItems = (prevState, props) => {
      return {
        index: this.defaultItem(),
        availPlayers: this.getAvailPlayers()
      };
  }

  render () {
    var items = [];
    var nextPlayer = "Player 1";
    var playerIndex = 0;
    if (this.props.player1) {
      nextPlayer = "Player 2";
      playerIndex = 1;
    }

    for (const p of this.state.availPlayers) {
      items.push (
        <Carousel.Item key={p.name} active={true}>
          <Image alt={p.name} src={p.thumb} width={200} height={200}/>
          <Carousel.Caption>
            <Button bsSize="large"
                    type="submit"
                    onClick={ () => {
                      console.log("btn:" + p.name);
                      this.players[playerIndex] = p.name;
                      this.props.playerChange(...this.players);
                      this.setState({
                        index: this.defaultItem(),
                        availPlayers: this.getAvailPlayers()
                      });
                    }}>{p.name}</Button>
            <p>{p.bio}</p>
          </Carousel.Caption>
        </Carousel.Item>
      )
    }

      // onSelect={this.handleCarouselSelect}
      // direction={this.state.direction}
    return(
      <div>
      <PageHeader>Choose {nextPlayer}</PageHeader>
      <Carousel defaultActiveIndex={this.state.index}>
      {items}
      </Carousel>
      </div>
    );
  }
}

export default GameSetup;
