function hex2rgb(value) {
    value = value.startsWith('#') ? value.slice(1) : value;
    let step = Math.floor(value.length / 3);

    let tup = [];
    for (let i = 0; i < value.length; i += step)
        tup.push(parseInt(value.slice(i, i + step), 16));

    return tup;
}

//rgb_to_hex = lambda rgb: '#%02x%02x%02x' % rgb
let rgb2hex = rgb => '#' + rgb.map(i => i.toString(16)).join('');