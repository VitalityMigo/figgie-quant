//https://github.com/SeanAriel/Bayesian-Inference/blob/master/figgie/Figgie_Strategy.ipynb
const math = require('mathjs');
const data = require("../config.js").data;

function compute_simple_range() {
    const table = []
    for (let i = 1; i <= data.hand - 5; i++) {

        // Non-observed cards in initial hand
        const remaining_cards = data.non_common;
        const remaining_hand = data.hand - i;

        // Count total hand combinations
        const total_hands = math.combinations(data.cards, data.hand);

        // Count total hand combinations with i observed cards in initial hand, if common, or uncommon
        const ways_getI_common = math.combinations(data.common, i) * math.combinations(remaining_cards, remaining_hand);
        const ways_getI_ten = math.combinations(data.medium, i) * math.combinations(data.cards - data.medium, remaining_hand);
        const ways_getI_eight = math.combinations(data.lower, i) * math.combinations(data.cards - data.lower, remaining_hand);

        // Probability of getting i common cards in initial hand
        const P_getI_and_common = ways_getI_common / total_hands;
        const P_getI_and_ten = ways_getI_ten / total_hands;
        const P_getI_and_eight = ways_getI_eight / total_hands;

        // Probability of getting i cards in initial hand
        const P_getI = (P_getI_and_common * 1/4) + (P_getI_and_ten * 1/2) + (P_getI_and_eight * 1/4);
console.log(P_getI)
l
        // Apply bayes rule
        const bayesrule = "XYZ"

        table.push({ observed: i, probability: bayesrule })
    }

}

compute_simple_range()