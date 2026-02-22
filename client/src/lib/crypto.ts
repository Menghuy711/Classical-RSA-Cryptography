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

// ============ RSA CIPHER - BigInt Implementation ============

// Function to compute base^expo mod m using BigInt
function rsaPower(base: bigint, expo: bigint, m: bigint): bigint {
  let res = BigInt(1);
  base = base % m;
  while (expo > BigInt(0)) {
    if ((expo & BigInt(1)) === BigInt(1)) {
      res = (res * base) % m;
    }
    base = (base * base) % m;
    expo = expo >> BigInt(1);
  }
  return res;
}

// Function to find GCD using Euclidean algorithm
function rsaGcd(a: bigint, b: bigint): bigint {
  while (b !== BigInt(0)) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

// Function to find modular inverse of e modulo phi(n)
function rsaModInverse(e: bigint, phi: bigint): bigint {
  for (let d = BigInt(2); d < phi; d++) {
    if ((e * d) % phi === BigInt(1)) {
      return d;
    }
  }
  return BigInt(-1);
}

// Check if a number is prime
export function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

// RSA Key Generation with custom primes
export function rsaGenerateKeysWithPrimes(p: number, q: number): { publicKey: { e: string; n: string }; privateKey: { d: string; n: string }; phi: string } | { error: string } {
  // Validate primes
  if (!isPrime(p) || !isPrime(q)) {
    return { error: 'Both p and q must be prime numbers' };
  }

  const pBig = BigInt(p);
  const qBig = BigInt(q);
  const n = pBig * qBig;
  const phi = (pBig - BigInt(1)) * (qBig - BigInt(1));

  // Choose public exponent e (commonly 17 or 65537)
  let e = BigInt(17);
  if (rsaGcd(e, phi) !== BigInt(1)) {
    // Try other small primes
    const candidates = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
    let found = false;
    for (const candidate of candidates) {
      const eBig = BigInt(candidate);
      if (rsaGcd(eBig, phi) === BigInt(1)) {
        e = eBig;
        found = true;
        break;
      }
    }
    if (!found) {
      return { error: 'Could not find suitable public exponent' };
    }
  }

  // Calculate private exponent d
  const d = rsaModInverse(e, phi);
  if (d === BigInt(-1)) {
    return { error: 'Could not calculate private exponent' };
  }

  return {
    publicKey: { e: e.toString(), n: n.toString() },
    privateKey: { d: d.toString(), n: n.toString() },
    phi: phi.toString()
  };
}

// RSA Key Generation with default primes (7919, 1009)
export function rsaGenerateKeys(): { publicKey: { e: string; n: string }; privateKey: { d: string; n: string }; phi: string } {
  const p = BigInt(7919);
  const q = BigInt(1009);
  const n = p * q;
  const phi = (p - BigInt(1)) * (q - BigInt(1));

  // Common public exponent
  let e = BigInt(17);
  if (rsaGcd(e, phi) !== BigInt(1)) {
    const candidates = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
    for (const candidate of candidates) {
      const eBig = BigInt(candidate);
      if (rsaGcd(eBig, phi) === BigInt(1)) {
        e = eBig;
        break;
      }
    }
  }

  // Calculate private exponent d
  const d = rsaModInverse(e, phi);

  return {
    publicKey: { e: e.toString(), n: n.toString() },
    privateKey: { d: d.toString(), n: n.toString() },
    phi: phi.toString()
  };
}

// RSA Encrypt - supports both text and numeric input
export function rsaEncrypt(input: string, e: string, n: string): string {
  const eBig = BigInt(e);
  const nBig = BigInt(n);

  // Check if input is numeric
  if (/^\d+$/.test(input.trim())) {
    // Numeric input mode
    const m = BigInt(input.trim());
    const c = rsaPower(m, eBig, nBig);
    return c.toString();
  } else {
    // Text input mode - convert each character to numeric value
    const encrypted: string[] = [];
    for (const char of input) {
      const charCode = BigInt(char.charCodeAt(0));
      const c = rsaPower(charCode, eBig, nBig);
      encrypted.push(c.toString().padStart(6, '0'));
    }
    return encrypted.join(' ');
  }
}

// RSA Decrypt - returns plaintext in same format as original input
export function rsaDecrypt(ciphertext: string, d: string, n: string): string {
  const dBig = BigInt(d);
  const nBig = BigInt(n);

  // Check if ciphertext contains spaces (text mode) or is single number (numeric mode)
  if (ciphertext.includes(' ')) {
    // Text mode - decrypt each encrypted character
    const decrypted: string[] = [];
    const parts = ciphertext.trim().split(' ');
    for (const part of parts) {
      if (part.trim() && /^\d+$/.test(part.trim())) {
        const c = BigInt(part.trim());
        const m = rsaPower(c, dBig, nBig);
        const charCode = Number(m);
        if (charCode >= 0 && charCode <= 1114111) { // Valid Unicode range
          decrypted.push(String.fromCharCode(charCode));
        }
      }
    }
    return decrypted.join('');
  } else {
    // Numeric mode - decrypt single number
    const c = BigInt(ciphertext.trim());
    const m = rsaPower(c, dBig, nBig);
    return m.toString();
  }
}

// Legacy functions for backward compatibility
export function gcdBig(a: BigNumber, b: BigNumber): BigNumber {
  while (!b.isEqualTo(0)) {
    const temp = b;
    b = a.mod(b);
    a = temp;
  }
  return a;
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
