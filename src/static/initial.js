import { data } from '../config.js';
import { permuteUnique } from '../math.js';
import * as math from 'mathjs'; // Import explicite de mathjs

function compute_complex_range(hand) {
    const table = [];
    for (const [suit, i] of Object.entries(hand)) {
        const other_dist = Object.values(hand).filter((value, index) => index !== Object.keys(hand).indexOf(suit));

        const total_hands = math.combinations(data.cards, data.hand);

        const ways_getI_common = math.combinations(data.common, i);
        const ways_get_others = permuteUnique([10, 10, 8]).reduce((sum, perm) => {
            const comb = other_dist.map((k, idx) => perm[idx] >= k ? math.combinations(perm[idx], k) : 0);
            return sum + (comb.some(c => c === 0) ? 0 : comb.reduce((a, b) => a * b, 1));
        }, 0) / 3;

        const ways_getHand_ICommon = ways_getI_common * ways_get_others;

        const suit_permutations = permuteUnique(data.suits_range);
        const ways_getHand = suit_permutations.reduce((sum, perm) => {
            const comb = [i, ...other_dist].map((k, idx) => perm[idx] >= k ? math.combinations(perm[idx], k) : 0);
            return sum + (comb.some(c => c === 0) ? 0 : comb.reduce((a, b) => a * b, 1));
        }, 0) / suit_permutations.length;

        const P_getHand_ICommon = ways_getHand_ICommon / total_hands;
        const P_getHand = ways_getHand / total_hands;

        const bayesrule = (P_getHand_ICommon * data.prior) / P_getHand;

        table.push({ hand: suit, observation: i, probability: bayesrule });
    }
    return table;
}

export { compute_complex_range };