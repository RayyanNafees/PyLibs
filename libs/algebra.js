const any = conditions => conditions.length > 1 ? conditions.map(i => Boolean(i)).includes(true) : all(...conditions[0]);
const iseqn = eqn => any(['=', '<', '>', '<=', '>=', '!='].map(i => eqn.includes(i)));
const sign = eqn => ['=', '<', '>', '<=', '>=', '!=', ''].filter(i => eqn.includes(i))[0];
const equify = expr => expr.replaceAll('**', '^').replaceAll(' ', '').replaceAll('==', '' )