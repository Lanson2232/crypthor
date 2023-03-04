# @varkhedigital/crypthor

Crypthor is a simple encrypt and decrypt module for node.js 
#### **AND IT SHOULDN'T BE USED FOR ENCRYPTING <u>PASSWORDS</u>**

This is a tool used for simple encryption of UTF-8 strings that need to be decrypted at a later time.

`Crypthor(secret, {options})`

-   secret: `<string>`
-   options: `<Object>`
    -   algorithm: `<string>` Defaults to `aes-128-cbc`
    -   iv: `<string>` Defaults to `crypto.randomByte(x)`
    -   ivLength: `<number>` Defaults to _`Algorithm Standart (crypto.getCipherInfo(this.algorithm).ivLength)`_

## Install
`npm install @varkhedigital/crypthor`

## Usage
```js
const Crypthor = require("@varkhedigital/crypthor");
const cipher = new Crypthor("VerySecureEncryptionKey");

const iv = cipher.iv.toString('hex');
console.log("Currently used IV: ", iv);
// ie: d7bc0270afa3371988464908eccd4b45

const encryptedString = cipher.encrypt("Encrypting Very Secret Text");
console.log("Encrypted String: ", encryptedString)
// ie: UvMqO4zi7mFiSHDMP82xcYTU68qa3cyPzwl6Spmx/IY=

const decryptedString = cipher.decrypt(encryptedString);
console.log("Decrypted String: ", decryptedString)
// ie: "Encrypting Very Secret Text"
```

#### Example Usage of Options

```javascript
const Crypthor = require('@varkhedigital/crypthor');

const cipher = new Crypthor('VerySecureEncryptionKey', {
    iv:Buffer.from("d7bc0270afa3371988464908eccd4b45", 'hex'),
    ivLength:16
});

const encryptedString = cryptr.encrypt('Encrypting Very Secret Text');

console.log("Encrypted String: ", encryptedString);
// ie: UvMqO4zi7mFiSHDMP82xcYTU68qa3cyPzwl6Spmx/IY=

const decryptedString = cryptr.decrypt(encryptedString);
console.log("Decrypted String: ", decryptedString);
// ie: "Encrypting Very Secret Text"

```