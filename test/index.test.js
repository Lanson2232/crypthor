const Crypthor = require("../index");
const cipher = new Crypthor('VerySecureEncryptionKey', {
    iv:Buffer.from("d7bc0270afa3371988464908eccd4b45", 'hex'),
    ivLength:16
});

test('Encrypt String', () => {
    expect(cipher.encrypt("Encrypting Very Secret Text")).toBe("UvMqO4zi7mFiSHDMP82xcYTU68qa3cyPzwl6Spmx/IY=")
})

test('Decrypt String', () => {
    expect(cipher.decrypt("UvMqO4zi7mFiSHDMP82xcYTU68qa3cyPzwl6Spmx/IY=")).toBe("Encrypting Very Secret Text")
})
