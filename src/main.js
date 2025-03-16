import { compute_complex_range } from './dynamic/initial.js';

function main(SPADES, CLUBS, DIAMONDS, HEARTS, math) {
  const hand = {
    SPADES: CLUBS,
    CLUBS: SPADES,
    DIAMONDS: HEARTS,
    HEARTS: DIAMONDS
  };

  return compute_complex_range(hand, math); // Passer math à compute_complex_range
}

export default main;