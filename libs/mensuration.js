function square(side, perimeter, area, diagonal) {
    if (side) {
        perimeter = 4 * side;
        area = side ** 2;
        diagonal = side * (2 ** 0.5);
    } else

    if (perimeter) {
        side = perimeter / 4;
        area = side ** 2;
        diagonal = side * (2 ** 0.5);
    } else

    if (area) {
        side = (area) ** 0.5;
        perimeter = 4 * side;
        diagonal = side * (2 ** 0.5);
    } else

    if (diagonal) {
        side = diagonal / (2 ** 0.5);
        perimeter = 4 * side;
        area = side ** 2;
    } else
        return Error('Atleast 1 argument is reqired');

    return {
        'side': side,
        'perimeter': perimeter,
        'area': area,
        'diagonal': diagonal
    };
}

function rectangle(l, b, area, perimeter, diagonal) {
    let [a, p, d] = [area, perimeter, diagonal];

    if (l && b) {
        p = 2 * (l + b);
        a = l * b;
        d = ((l ** 2) + (b ** 2)) ** 0.5;
    } else

    if (l && area) {
        p = 2 * (l + b);
        b = a / l;
        d = ((l ** 2) + (b ** 2)) ** 0.5;
    } else

    if (b && a) {
        p = 2 * (l + b);
        l = a / b;
        d = ((l ** 2) + (b ** 2)) ** 0.5;
    } else

    if (l && p) {
        b = p / 2 - l;
        a = l * b;
        d = ((l ** 2) + (b ** 2)) ** 0.5;
    } else

    if (p && b) {
        l = p / 2 - b;
        a = l * b;
        d = ((l ** 2) + (b ** 2)) ** 0.5;
    } else

    if (l && d) {
        p = 2 * (l + b);
        a = l * b;
        b = ((d ** 2) - (l ** 2)) ** 0.5;
    } else

    if (d && b) {
        p = 2 * (l + b);
        a = l * b;
        l = ((d ** 2) - (b ** 2)) ** 0.5;
    } else

    if (a && p) {
        for (let ln = 0; ln <= Math.max(a, p); ln++)
            for (let bd = 0; bd <= Math.max(a, p); bd++)
                if (ln + bd == p / 2 && ln * bd == a) {
                    [l, b] = [ln, bd];
                    break;
                }
        d = ((l ** 2) + (b ** 2)) ** 0.5;
    } else

    if (d && p) {
        for (let ln = 0; ln <= Math.max(a, p); ln++)
            for (let bd = 0; bd <= Math.max(a, p); bd++)
                if (ln + bd == p / 2 && ((ln ** 2) + (bd ** 2)) ** 0.5 == d) {
                    [l, b] = [ln, bd];
                    break;
                }
        a = l * b;
    } else

    if (d && a) {
        for (let ln = 0; ln <= Math.max(a, p); ln++)
            for (let bd = 0; bd <= Math.max(a, p); bd++)
                if (ln * bd == a && ((ln ** 2) + (bd ** 2)) ** 0.5 == d) {
                    [l, b] = [ln, bd];
                    break;
                }
        p = 2 * (l + b);
    }

    return {
        length: l,
        breadth: b,
        area: a,
        perimeter: p,
        diagonal: d
    };
}