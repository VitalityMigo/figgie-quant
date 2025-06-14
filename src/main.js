import { compute_complex_range } from './static/initial.js';

function initialHand(SPADES, CLUBS, DIAMONDS, HEARTS, math) {
  const hand = {
    SPADES: CLUBS,
    CLUBS: SPADES,
    DIAMONDS: HEARTS,
    HEARTS: DIAMONDS
  };

  return compute_complex_range(hand, math); // Passer math à compute_complex_range
}

export default initialHand;