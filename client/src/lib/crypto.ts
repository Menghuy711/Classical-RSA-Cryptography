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

// RSA Cipher - Corrected Implementation using BigInt

// Function to calculate gcd using Euclidean Algorithm with BigInt
function gcdBigInt(a: bigint, b: bigint): bigint {
  while (b !== 0n) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Function to calculate modular inverse using Extended Euclidean Algorithm
function modInverseBigInt(a: bigint, m: bigint): bigint {
  let m0 = m, t: bigint, q: bigint;
  let x0 = 0n, x1 = 1n;

  if (m === 1n) return 0n;

  while (a > 1n) {
    q = a / m;
    t = m;

    // m is remainder now, process same as Euclid's algorithm
    m = a % m;
    a = t;
    t = x0;

    x0 = x1 - q * x0;
    x1 = t;
  }

  // Make x1 positive
  if (x1 < 0n) x1 += m0;

  return x1;
}

// Function to compute base^expo mod m using BigInt
function powerBigInt(base: bigint, expo: bigint, m: bigint): bigint {
  let res = 1n;
  base = base % m;
  while (expo > 0n) {
    if (expo & 1n) {
      res = (res * base) % m;
    }
    base = (base * base) % m;
    expo = expo >> 1n;
  }
  return res;
}

// RSA Key Generation with custom primes
export function rsaGenerateKeysWithPrimes(p: number, q: number): { publicKey: { e: string; n: string }; privateKey: { d: string; n: string }; phi: string } | { error: string } {
  const pBig = BigInt(p);
  const qBig = BigInt(q);
  const n = pBig * qBig;
  const phi = (pBig - 1n) * (qBig - 1n);

  // Generate a random public exponent e such that 1 < e < φ(n) and gcd(e, φ(n)) = 1
  let e: bigint = 3n;
  let found = false;
  
  // Try common values first
  const candidates = [3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n, 65537n];
  for (const candidate of candidates) {
    if (candidate < phi && gcdBigInt(candidate, phi) === 1n) {
      e = candidate;
      found = true;
      break;
    }
  }
  
  if (!found) {
    return { error: 'Could not find suitable public exponent' };
  }

  // Compute d such that e * d ≡ 1 (mod phi(n))
  const d = modInverseBigInt(e, phi);

  return {
    publicKey: { e: e.toString(), n: n.toString() },
    privateKey: { d: d.toString(), n: n.toString() },
    phi: phi.toString()
  };
}

// RSA Key Generation with default primes
export function rsaGenerateKeys(): { publicKey: { e: string; n: string }; privateKey: { d: string; n: string } } {
  const p = 61n;
  const q = 53n;
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);

  // Generate a random public exponent e such that 1 < e < φ(n) and gcd(e, φ(n)) = 1
  let e: bigint;
  const maxAttempts = 100;
  let attempts = 0;

  do {
    e = BigInt(Math.floor(Math.random() * Number(phi - 2n)) + 2);
    attempts++;
  } while (gcdBigInt(e, phi) !== 1n && attempts < maxAttempts);

  // Compute d such that e * d ≡ 1 (mod phi(n))
  const d = modInverseBigInt(e, phi);

  return {
    publicKey: { e: e.toString(), n: n.toString() },
    privateKey: { d: d.toString(), n: n.toString() }
  };
}

// RSA Encryption
export function rsaEncrypt(message: string, e: string, n: string): string {
  const eBig = BigInt(e);
  const nBig = BigInt(n);
  const chunkSize = Math.max(1, Math.floor(nBig.toString().length / 3) - 1);
  
  // Convert message to 3-digit ASCII codes and split into chunks
  const messageChunks = message
    .split('')
    .map(char => char.charCodeAt(0).toString().padStart(3, '0'))
    .join('')
    .match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];

  const encryptedChunks = messageChunks.map(chunk => {
    const messageCode = BigInt(chunk);
    if (messageCode >= nBig) {
      throw new Error('Message chunk is too large for the key size.');
    }
    const encrypted = powerBigInt(messageCode, eBig, nBig);
    return encrypted.toString().padStart(nBig.toString().length, '0');
  });

  return encryptedChunks.join('');
}

// RSA Decryption
export function rsaDecrypt(encryptedMessage: string, d: string, n: string): string {
  const dBig = BigInt(d);
  const nBig = BigInt(n);
  const chunkSize = nBig.toString().length;
  
  const encryptedChunks = encryptedMessage.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];
  let messageCode = '';

  encryptedChunks.forEach(chunk => {
    const encryptedCode = BigInt(chunk);
    const decrypted = powerBigInt(encryptedCode, dBig, nBig);
    messageCode += decrypted.toString();
  });

  // Convert 3-digit ASCII codes back to characters
  const characters = messageCode.match(/.{1,3}/g)?.map(code => String.fromCharCode(Number(code))) || [];

  return characters.join('');
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

// GCD function for BigNumber compatibility (kept for backward compatibility)
export function gcdBig(a: any, b: any): any {
  while (!b.isEqualTo(0)) {
    const temp = b;
    b = a.mod(b);
    a = temp;
  }
  return a;
}
