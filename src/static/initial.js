//https://github.com/SeanAriel/Bayesian-Inference/blob/master/figgie/Figgie_Strategy.ipynb
const math = require('mathjs');
const data = require("../config.js").data;

function compute_simple_range() {
    const table = []
    for (let i = 1; i <= data.hand; i++) {

        // Non-observed cards in initial hand
        const remaining_cards = data.non_common;
        const remaining_hands = data.hand - i;

        // Count total hand combinations
        const total_hands = math.combinations(data.cards, data.hand);

        // Count total hand combinations with i observed cards in initial hand
        const ways_getI_common = math.combinations(data.common, i) * math.combinations(remaining_cards, remaining_hands);

        const bayesrule = "XYZ"
    }
}

compute_simple_range()