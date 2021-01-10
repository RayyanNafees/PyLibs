let [pi, sin, tan] = [Math.PI, Math.sin, Math.tan];
let Rad = deg => deg / 180 * pi;
let Deg = rad => rad / pi * 180;

function dist(basis, angL, angR, unit = 'deg', dp = null) {
    let [x, y, z];
    if (unit === 'rad')
        [x, y, z] = [Rad(angL), Rad(angR), Rad(180 - angL - angR)];
    else if (unit === 'rad')
        [x, y, z] = [angL, angR, Rad(180 - Deg(angL) - Deg(angR))];

    if (!z) return basis;

    let s_z = basis;
    let s_y = abs(sin(y) / sin(z)) * basis;
    let s_x = abs(sin(x) / sin(z)) * basis;
    let sp = (s_x + s_y + s_z) * 0.5;
    let area = (sp * (sp - s_x) * (sp - s_y) * (sp - s_z)) ** 0.5;
    let alt = basis ? (2 * area) / basis : 0;
    return alt;
}

let cot = ang => tan(ang) ** (-1);
let dist2 = (basis, angL, angR) => basis / (cot(Rad(angL)) + cot(Rad(angL)));

function height(basis, Dist, angL, angR, unit = 'deg', dp = null) {
    if (unit === 'rad')
        [angL, angR] = Deg(angL, angR);

    let size = angL + angR;

    if (size === 180) return basis;

    if (size > 180) {
        let [x, y] = [basis, dist(basis, 180 - angL, 180 - angR)];
        return (y + Dist) / y * x;

    } else {
        let [x, y] = [basis, dist(basis, angL, angR)];
        return (y - Dist) / y * x;
    }
}
//#lenght = lambda basis, Dist, angL, angR: ((y:= dist(basis, *(180-angL,180-angR if s>180 else angL,angR)))+Dist if (s:= angl+angR)>180 else y-Dist)/y*basis