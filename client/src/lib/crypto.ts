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
export function transpositionEncrypt(plaintext: string, key: string): string {
  const numCols = key.length;
  const numRows = Math.ceil(plaintext.length / numCols);
  const paddedPlaintext = plaintext.padEnd(numRows * numCols, ' '); // Pad plaintext to fit the grid
  const grid: string[] = [];

  // Fill the grid row by row
  for (let i = 0; i < numRows; i++) {
    grid.push(paddedPlaintext.slice(i * numCols, (i + 1) * numCols));
  }

  // Sort the key and get the column order
  const sortedKey = Array.from(key).map((char, index) => ({ char, index })).sort((a, b) => a.char.localeCompare(b.char));
  const ciphertext = sortedKey.map(({ index }) => grid.map((row: string) => row[index]).join('')).join('');

  return ciphertext.trim(); // Remove any trailing spaces
}

export function transpositionDecrypt(ciphertext: string, key: string): string {
  const numCols = key.length;
  const numRows = Math.ceil(ciphertext.length / numCols);
  const paddedCiphertext = ciphertext.padEnd(numRows * numCols, ' '); // Pad ciphertext to fit the grid
  const grid: string[][] = Array.from({ length: numRows }, () => Array(numCols).fill(' '));

  // Sort the key and get the column order
  const sortedKey = Array.from(key).map((char, index) => ({ char, index })).sort((a, b) => a.char.localeCompare(b.char));
  const sortedIndices = sortedKey.map(({ index }) => index);

  // Fill the grid column by column
  let charIndex = 0;
  for (let i = 0; i < numCols; i++) {
    const colIndex = sortedIndices[i];
    for (let j = 0; j < numRows; j++) {
      if (charIndex < paddedCiphertext.length) {
        grid[j][colIndex] = paddedCiphertext[charIndex++];
      }
    }
  }

  // Read the grid row by row to reconstruct the plaintext
  return grid.map(row => row.join('')).join('').trim();
}

// RSA Cipher
export function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

export function gcdBig(a: BigNumber, b: BigNumber): BigNumber {
  while (!b.isEqualTo(0)) {
    const temp = b;
    b = a.mod(b);
    a = temp;
  }
  return a;
}

export function rsaGenerateKeysWithPrimes(p: number, q: number): { publicKey: { e: string; n: string }; privateKey: { d: string; n: string }; phi: string } | { error: string } {
  // Validate primes
  if (!isPrime(p) || !isPrime(q)) {
    return { error: 'Both p and q must be prime numbers' };
  }
  
  if (p === q) {
    return { error: 'p and q must be different prime numbers' };
  }
  
  const pBig = new BigNumber(p);
  const qBig = new BigNumber(q);
  const n = pBig.multipliedBy(qBig);
  const phi = pBig.minus(1).multipliedBy(qBig.minus(1));
  
  // Choose public exponent e (commonly 17 or 65537)
  let e = new BigNumber(17);
  if (gcdBig(e, phi).isEqualTo(1)) {
    // Use 17 if it's coprime with phi
  } else {
    // Try other small primes
    const candidates = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
    let found = false;
    for (const candidate of candidates) {
      const eBig = new BigNumber(candidate);
      if (gcdBig(eBig, phi).isEqualTo(1)) {
        e = eBig;
        found = true;
        break;
      }
    }
    if (!found) {
      return { error: 'Could not find suitable public exponent' };
    }
  }
  
  // Calculate private exponent
  const d = modInverseBig(e, phi);
  
  return {
    publicKey: { e: e.toString(), n: n.toString() },
    privateKey: { d: d.toString(), n: n.toString() },
    phi: phi.toString()
  };
}

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
    .split('')
    .map(char => {
      if (char >= 'A' && char <= 'Z') {
        const m = new BigNumber(char.charCodeAt(0) - 65);
        const c = modPow(m, eBig, nBig);
        return c.toString().padStart(4, '0');
      } else if (char >= 'a' && char <= 'z') {
        const m = new BigNumber(char.charCodeAt(0) - 97 + 26);
        const c = modPow(m, eBig, nBig);
        return c.toString().padStart(4, '0');
      } else if (char === ' ') {
        // Use code 52 for space (after a-z which ends at 51)
        const m = new BigNumber(52);
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
        
        // Check for space (code 52)
        if (charCode === 52) {
          return ' ';
        }
        // Uppercase letters (0-25)
        if (charCode >= 0 && charCode <= 25) {
          return String.fromCharCode(charCode + 65);
        }
        // Lowercase letters (26-51)
        if (charCode >= 26 && charCode <= 51) {
          return String.fromCharCode(charCode - 26 + 97);
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
