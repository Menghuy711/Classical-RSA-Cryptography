import BigNumber from 'bignumber.js';

// Caesar Cipher (fixed shift of 3)
export function caesarEncrypt(text: string): string {
  return shiftEncrypt(text, 3);
}

export function caesarDecrypt(text: string): string {
  return shiftDecrypt(text, 3);
}

// General Shift Cipher
export function shiftEncrypt(text: string, shift: number): string {
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      if (char >= 'A' && char <= 'Z') {
        const code = ((char.charCodeAt(0) - 65 + shift) % 26 + 26) % 26;
        return String.fromCharCode(code + 65);
      }
      return char;
    })
    .join('');
}

export function shiftDecrypt(text: string, shift: number): string {
  return shiftEncrypt(text, -shift);
}

export function getShiftMapping(shift: number): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const shifted = alphabet.split('').map((_, i) => {
    const code = (i + shift % 26 + 26) % 26;
    return alphabet[code];
  }).join('');
  return `${alphabet}\n${shifted}`;
}

// Affine Cipher
export function affineEncrypt(text: string, a: number, b: number): string {
  if (gcd(a, 26) !== 1) {
    throw new Error('a must be coprime with 26');
  }
  
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      if (char >= 'A' && char <= 'Z') {
        const x = char.charCodeAt(0) - 65;
        const code = (a * x + b) % 26;
        return String.fromCharCode(code + 65);
      }
      return char;
    })
    .join('');
}

export function affineDecrypt(text: string, a: number, b: number): string {
  if (gcd(a, 26) !== 1) {
    throw new Error('a must be coprime with 26');
  }
  
  const aInv = modInverse(a, 26);
  
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      if (char >= 'A' && char <= 'Z') {
        const y = char.charCodeAt(0) - 65;
        const code = (aInv * (y - b + 26)) % 26;
        return String.fromCharCode((code + 26) % 26 + 65);
      }
      return char;
    })
    .join('');
}

function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function modInverse(a: number, m: number): number {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return 1;
}

// Transposition Cipher (Columnar)
export function transpositionEncrypt(text: string, key: string): string {
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
  const keyOrder = getKeyOrder(key);
  const numCols = key.length;
  const numRows = Math.ceil(cleanText.length / numCols);
  
  // Create grid
  const grid: string[][] = [];
  let index = 0;
  for (let r = 0; r < numRows; r++) {
    grid[r] = [];
    for (let c = 0; c < numCols; c++) {
      grid[r][c] = index < cleanText.length ? cleanText[index] : 'X';
      index++;
    }
  }
  
  // Read columns in key order
  let result = '';
  keyOrder.forEach(col => {
    for (let r = 0; r < numRows; r++) {
      result += grid[r][col];
    }
  });
  
  return result;
}

export function transpositionDecrypt(text: string, key: string): string {
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
  const keyOrder = getKeyOrder(key);
  const numCols = key.length;
  const numRows = Math.ceil(cleanText.length / numCols);
  
  // Create empty grid
  const grid: string[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(''));
  
  // Fill columns in key order
  let index = 0;
  keyOrder.forEach(col => {
    for (let r = 0; r < numRows; r++) {
      if (index < cleanText.length) {
        grid[r][col] = cleanText[index];
        index++;
      }
    }
  });
  
  // Read rows
  let result = '';
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      result += grid[r][c];
    }
  }
  
  return result;
}

function getKeyOrder(key: string): number[] {
  const sorted = key.toUpperCase().split('').map((char, idx) => ({ char, idx }))
    .sort((a, b) => a.char.localeCompare(b.char));
  return sorted.map(item => item.idx);
}

// RSA Cipher
export function rsaGenerateKeys(): { publicKey: { e: string; n: string }; privateKey: { d: string; n: string } } {
  // Use small primes for demonstration
  const p = new BigNumber(61);
  const q = new BigNumber(53);
  const n = p.multipliedBy(q);
  const phi = p.minus(1).multipliedBy(q.minus(1));
  
  // Common public exponent
  const e = new BigNumber(17);
  
  // Calculate private exponent
  const d = modInverseBig(e, phi);
  
  return {
    publicKey: { e: e.toString(), n: n.toString() },
    privateKey: { d: d.toString(), n: n.toString() }
  };
}

export function rsaEncrypt(text: string, e: string, n: string): string {
  const eBig = new BigNumber(e);
  const nBig = new BigNumber(n);
  
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      if (char >= 'A' && char <= 'Z') {
        const m = new BigNumber(char.charCodeAt(0) - 65);
        const c = modPow(m, eBig, nBig);
        return c.toString().padStart(4, '0');
      }
      return char;
    })
    .join(' ');
}

export function rsaDecrypt(text: string, d: string, n: string): string {
  const dBig = new BigNumber(d);
  const nBig = new BigNumber(n);
  
  return text
    .split(' ')
    .map(code => {
      if (code.trim() && /^\d+$/.test(code.trim())) {
        const c = new BigNumber(code.trim());
        const m = modPow(c, dBig, nBig);
        const charCode = m.toNumber();
        if (charCode >= 0 && charCode <= 25) {
          return String.fromCharCode(charCode + 65);
        }
      }
      return '';
    })
    .join('');
}

function modPow(base: BigNumber, exp: BigNumber, mod: BigNumber): BigNumber {
  let result = new BigNumber(1);
  base = base.mod(mod);
  
  while (exp.isGreaterThan(0)) {
    if (exp.mod(2).isEqualTo(1)) {
      result = result.multipliedBy(base).mod(mod);
    }
    exp = exp.dividedToIntegerBy(2);
    base = base.multipliedBy(base).mod(mod);
  }
  
  return result;
}

function modInverseBig(a: BigNumber, m: BigNumber): BigNumber {
  let [old_r, r] = [a, m];
  let [old_s, s] = [new BigNumber(1), new BigNumber(0)];
  
  while (!r.isEqualTo(0)) {
    const quotient = old_r.dividedToIntegerBy(r);
    [old_r, r] = [r, old_r.minus(quotient.multipliedBy(r))];
    [old_s, s] = [s, old_s.minus(quotient.multipliedBy(s))];
  }
  
  return old_s.isLessThan(0) ? old_s.plus(m) : old_s;
}
