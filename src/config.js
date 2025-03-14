const data = {
    suits: 4,
    prior: 1 / 4,
    cards : 40,
    hand : 10,
    common : 12,
    medium : 10,
    lower: 8,
    non_common : 40 - 12,
    suits_range: [8, 10, 10, 12],
    suits_name: ['hearts', 'diamonds', 'clubs', 'spades'],
}

module.exports = {
    data,
}