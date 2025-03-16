//https://github.com/SeanAriel/Bayesian-Inference/blob/master/figgie/Figgie_Strategy.ipynb
const math = require('mathjs');
const data = require("../config.js").data;
const { permuteUnique } = require("../math.js")

function compute_simple_ranges() {
    const table = []
    for (let i = 0; i <= data.hand; i++) {

        // Non-observed cards in initial hand
        const uncommon_cards = data.uncommon;
        const remaining_hand = data.hand - i;

        // Count total hand combinations
        const total_hands = math.combinations(data.cards, data.hand);

        // Count total hand combinations with i observed cards in initial hand, if common, or uncommon
        const ways_getI_common = math.combinations(data.common, i) * math.combinations(uncommon_cards, remaining_hand);
        const ways_getI_ten = math.combinations(data.medium, i) * math.combinations(data.cards - data.medium, remaining_hand);
        const ways_getI_eight = math.combinations(data.lower, i <= 8 ? i : 8) * math.combinations(data.cards - data.lower, i <= 8 ? remaining_hand : data.hand - 8);

        // Probability of getting i common cards in initial hand
        const P_getI_of_common = ways_getI_common / total_hands;
        const P_getI_of_ten = ways_getI_ten / total_hands;
        const P_getI_of_eight = i <= 8 ? ways_getI_eight / total_hands : 0

        // Probability of getting i cards in initial hand
        const P_getI = (P_getI_of_common * data.prior) + (P_getI_of_ten * 2 * data.prior) + (P_getI_of_eight * data.prior);

        // Apply bayes rule
        const bayesrule = (P_getI_of_common * data.prior) / P_getI;

        table.push({ observed: i, probability: bayesrule })
    }

    return table
}