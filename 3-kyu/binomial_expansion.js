function expand(str) {
  const fac = n => n < 2 ? 1 : n * fac(n - 1);
  let result = '', [_, a, x, b, n] = str.match(/\((-?\d*)([a-z])([-+]\d+)\)\^(\d+)/);

  a = a ? a == '-' ? -1 : parseInt(a) : 1;
  b = parseInt(b); n = parseInt(n);

  for (let i = n; i >= 0; i--) {
      let k = n - i;
      let c = !b && k > 0
          ? 0
          : a**i * b**k * (k == 0
              ? 1
              : fac(n) / (fac(k) * fac(n - k)));

      if (Math.abs(c) == 1 && i > 0) c = c > 0 ? '+' : '-';
      else c = c > 0 ? `+${c}` : c;
      if (c) result += c;

      if (i > 0 && c) result += x;
      if (i > 1 && c) result += `^${i}`;
  }

  return result[0] == '+' ? result.substr(1) : result;
}