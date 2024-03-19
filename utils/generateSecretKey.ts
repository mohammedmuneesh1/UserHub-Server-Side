import crypto, { randomBytes } from "crypto"
const randomByte = randomBytes(32);
const secretKey= randomByte.toString('hex')
console.log(secretKey)