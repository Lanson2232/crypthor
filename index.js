const crypto = require('crypto');

class Crypthor {
    constructor(secret, options = {}) {

        this.secret = secret;
        this.algorithm = crypto.getCiphers().indexOf(options.algorithm) !== -1 ? options.algorithm : 'aes-128-cbc';
        this.ivLength = options.ivLength ? options.ivLength : crypto.getCipherInfo(this.algorithm).ivLength;
        this.iv = options.iv ? options.iv : crypto.randomBytes(this.ivLength);
        if (!this.secret || typeof (secret) !== 'string') {
            throw new TypeError("Crypthor: Secret must be defined!");
        }

        if (options.algorithm != undefined && crypto.getCiphers().indexOf(options.algorithm) == -1) {
            throw new TypeError("Crypthor: Defined Algorithm not supported! \"" + options.algorithm + "\" ");
        }

    }

    getCiphers = () => {
        return crypto.getCiphers()
    }

    getCipher = (name) => {
        return crypto.getCipherInfo(name);
    }


    encrypt = (val) => {
        const hash = crypto.createHash('sha256').update(this.secret);
        this.key = hash.digest("base64").slice(this.ivLength * -1);
        let cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(val, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    };

    decrypt = (encrypted) => {
        const hash = crypto.createHash('sha256').update(this.secret);
        this.key = hash.digest("base64").slice(this.ivLength * -1);
        let decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = decipher.update(encrypted, 'base64', 'utf8');
        return (decrypted + decipher.final('utf8'));
    };

}

module.exports = Crypthor;