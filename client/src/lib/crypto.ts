
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
        const encrypted = (a * x + b) % 26;
        return String.fromCharCode(encrypted + 65);
      }
      return char;
    })
    .join('');
}

export function affineDecrypt(text: string, a: number, b: number): string {
  const a_inv = modInverse(a, 26);
  
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      if (char >= 'A' && char <= 'Z') {
        const y = char.charCodeAt(0) - 65;
        const decrypted = (a_inv * (y - b + 26)) % 26;
        return String.fromCharCode(decrypted + 65);
      }
      return char;
    })
    .join('');
}

// Transposition Cipher
export function transpositionEncrypt(text: string, key: string): string {
  const cleanText = text.toUpperCase().replace(/\s/g, '');
  const keyLength = key.length;
  
  // Create order array based on key
  const order = key
    .split('')
    .map((char, idx) => ({ char, idx }))
    .sort((a, b) => a.char.localeCompare(b.char))
    .map((item, newIdx) => ({ oldIdx: item.idx, newIdx }));
  
  // Pad text if necessary
  const paddedLength = Math.ceil(cleanText.length / keyLength) * keyLength;
  const paddedText = cleanText.padEnd(paddedLength, 'X');
  
  // Create grid
  const grid: string[][] = [];
  for (let i = 0; i < paddedText.length; i += keyLength) {
    grid.push(paddedText.slice(i, i + keyLength).split(''));
  }
  
  // Read columns in key order
  let result = '';
  for (const { oldIdx } of order) {
    for (const row of grid) {
      result += row[oldIdx];
    }
  }
  
  return result;
}

export function transpositionDecrypt(text: string, key: string): string {
  const keyLength = key.length;
  const numRows = Math.ceil(text.length / keyLength);
  
  // Create order array based on key
  const order = key
    .split('')
    .map((char, idx) => ({ char, idx }))
    .sort((a, b) => a.char.localeCompare(b.char))
    .map((item, newIdx) => ({ oldIdx: item.idx, newIdx }));
  
  // Create grid by filling columns
  const grid: string[][] = Array(numRows).fill(null).map(() => Array(keyLength).fill(''));
  
  let idx = 0;
  for (const { oldIdx } of order) {
    for (let row = 0; row < numRows; row++) {
      if (idx < text.length) {
        grid[row][oldIdx] = text[idx++];
      }
    }
  }
  
  // Read rows
  return grid.map(row => row.join('')).join('');
}

// Helper functions
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function modInverse(a: number, m: number): number {
  let [old_r, r] = [a, m];
  let [old_s, s] = [1, 0];
  
  while (r !== 0) {
    const quotient = Math.floor(old_r / r);
    [old_r, r] = [r, old_r - quotient * r];
    [old_s, s] = [s, old_s - quotient * s];
  }
  
  return old_s < 0 ? old_s + m : old_s;
}

function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

// RSA Cryptography with BigInt
export function rsaGenerateKeysWithPrimes(p: string, q: string): any {
  const pBig = BigInt(p);
  const qBig = BigInt(q);
  const n = pBig * qBig;
  const phi = (pBig - 1n) * (qBig - 1n);
  
  // Generate random e such that 1 < e < φ(n) and gcd(e, φ(n)) = 1
  let e: bigint;
  do {
    e = BigInt(Math.floor(Math.random() * (Number(phi) - 2)) + 2);
  } while (gcdBig(e, phi) !== 1n);
  
  // Calculate private exponent d
  const d = modInverseBig(e, phi);
  
  return {
    publicKey: { e: e.toString(), n: n.toString() },
    privateKey: { d: d.toString(), n: n.toString() },
    phi: phi.toString()
  };
}

export function rsaGenerateKeys(): { publicKey: { e: string; n: string }; privateKey: { d: string; n: string } } {
  // Use small primes for demonstration
  const p = 61n;
  const q = 53n;
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);
  
  // Common public exponent
  const e = 17n;
  
  // Calculate private exponent
  const d = modInverseBig(e, phi);
  
  return {
    publicKey: { e: e.toString(), n: n.toString() },
    privateKey: { d: d.toString(), n: n.toString() }
  };
}

export function rsaEncrypt(message: string, e: string, n: string): string {
  const eBig = BigInt(e);
  const nBig = BigInt(n);
  
  // Convert message to 3-digit ASCII codes
  const chunkSize = Math.max(1, Math.floor(nBig.toString().length / 3) - 1);
  const messageChunks = [...message]
    .map(char => char.charCodeAt(0).toString().padStart(3, '0'))
    .join('')
    .match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];
  
  const encryptedChunks = messageChunks.map(chunk => {
    const messageCode = BigInt(chunk);
    if (messageCode >= nBig) {
      throw new Error('Message chunk is too long for the key size.');
    }
    const encrypted = modPowBig(messageCode, eBig, nBig);
    return encrypted.toString().padStart(nBig.toString().length, '0');
  });
  
  return encryptedChunks.join('');
}

export function rsaDecrypt(encryptedMessage: string, d: string, n: string): string {
  const dBig = BigInt(d);
  const nBig = BigInt(n);
  
  const chunkSize = nBig.toString().length;
  const encryptedChunks = encryptedMessage.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];
  
  let messageCode = '';
  
  encryptedChunks.forEach(chunk => {
    const encryptedCode = BigInt(chunk);
    const decrypted = modPowBig(encryptedCode, dBig, nBig);
    messageCode += decrypted.toString();
  });
  
  const characters = messageCode.match(/.{1,3}/g) || [];
  return characters.map(code => String.fromCharCode(Number(code))).join('');
}

function modPowBig(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n;
  base = base % mod;
  
  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod;
    }
    exp = exp / 2n;
    base = (base * base) % mod;
  }
  
  return result;
}

function modInverseBig(a: bigint, m: bigint): bigint {
  let m0 = m;
  let t: bigint;
  let q: bigint;
  let x0 = 0n;
  let x1 = 1n;
  
  if (m === 1n) return 0n;
  
  while (a > 1n) {
    q = a / m;
    t = m;
    
    m = a % m;
    a = t;
    t = x0;
    
    x0 = x1 - q * x0;
    x1 = t;
  }
  
  if (x1 < 0n) x1 += m0;
  
  return x1;
}

function gcdBig(a: bigint, b: bigint): bigint {
  while (b !== 0n) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
