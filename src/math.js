function permuteUnique(nums) {
    const result = new Set(); nums.sort((a, b) => a - b);
    const generate = (arr, path) => {
        if (!arr.length) return result.add(path.join(','));
        for (let i = 0; i < arr.length; i++) {
            if (i > 0 && arr[i] === arr[i - 1]) continue; 
            generate(arr.slice(0, i).concat(arr.slice(i + 1)), path.concat(arr[i]));
        }
    };
    generate(nums, []);
    return [...result].map(p => p.split(',').map(Number));
}

module.exports = {
    permuteUnique
}