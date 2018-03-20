
// This sucks, but dynamically importing images w/ react seems hard

import jdbSq from './squares/20170531_juliet-author.png';
import vjbSq from './squares/vjb-headshot.png';
import asbSq from './squares/asb-peace.png';
import djbSq from './squares/djb-head.png';
import scbSq from './squares/scb-head.png';

import asbW from './victory/Annie-victory.mp4';
import jdbW from './victory/juliet-victory.mp4';

const Players =
{
  Vince:
  {
    name: "Vince",
    thumb: vjbSq,
    victory: null,
    bio: "Eats nails for breakfast (and atleast 2 granola bars)",
  },
  Juliet:
  {
    name: "Juliet",
    thumb: jdbSq,
    victory: jdbW,
    bio: "Twinkly eyes, twinkly shoes, twinkly tic-tac BAM!",
  },
  Annabelle:
  {
    name: "Annabelle",
    thumb: asbSq,
    victory: asbW,
    bio: "What's the wifi password here?",
  },
  Dan:
  {
    name: "Dan",
    thumb: djbSq,
    victory: null,
    bio: "Tic tac toe Jedi Master",
  },
  Sarah:
  {
    name: "Sarah",
    thumb: scbSq,
    victory: null,
    bio: "Enjoys long, moonlit walks on the beach",
  },
};

export default Players;
