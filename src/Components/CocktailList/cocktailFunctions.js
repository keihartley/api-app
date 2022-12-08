export default function getInfo(keys, substring, cocktail) {
    const res = [];
    keys.forEach(function (key) {
        if (key.includes(substring)) {
            res.push(key);
        }
    });
    const vals = [];
    res.forEach(function (key) {
        const val = cocktail[key];
        if (val !== null) {
            vals.push(val);
        }
    });
    return vals;
}