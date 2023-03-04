const crypto = require('crypto');

class cryptro{
    constructor(secret, options={}){
        this.secret = secret;
        this.algorithm = options.algorithm ? options.algorithm : 'aes-128-cbc';
        this.ivLength = options.ivLength ? options.ivLength : 16;
        this.iv = options.iv ? options.iv : crypto.randomBytes(this.ivLength);
        this.tagLength = options.tagLength ? options.tagLength : 16;
        this.dSaltLength = options.defaultSaltLength ? options.defaultSaltLength : 16;

        if(!this.secret  || typeof(secret) !== 'string'){
            throw new TypeError("Cryptor: Secret must be defined!");
        }
    }
    
encrypt = ((val) => {
  const hash = crypto.createHash('sha256').update(this.secret);
  this.key = hash.digest("base64").slice(this.ivLength * -1);
  let cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
  let encrypted = cipher.update(val, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
});

 decrypt = ((encrypted) => {
  const hash = crypto.createHash('sha256').update(this.secret);
  this.key = hash.digest("base64").slice(this.ivLength * -1);

  let decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  return (decrypted + decipher.final('utf8'));
});

}


const makarov = new cryptro("Mesela sen malsın", {
    iv:Buffer.from("3ed51202321c81cc65501c5857d98831", 'hex'),
    ivLength:16
});

console.log(makarov.encrypt("Anen"))
console.log(makarov.decrypt("b+jBzNeLgYDmn2FRUdqV0w=="))