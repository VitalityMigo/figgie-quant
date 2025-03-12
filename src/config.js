const gameplay = {
    suits_range: [8, 10, 10, 12],
    suits_name: ['hearts', 'diamonds', 'clubs', 'spades'],
}

const data = {
    suits: 4,
    prior: 1 / suits,
    cards : 40,
    hand : 10,
    common : 12,
    uncommon : 10,
    non_common : cards - common,
}

module.exports = {
    gameplay,
    data,
}