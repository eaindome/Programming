const crypto = require('crypto');
const { generateKeyPairSync, privateDecrypt, publicEncrypt } = require('crypto');
const fs = require('fs');
const path = require('path');



const generateRSAKeys = () => {
    const privateKeyPath = path.join(__dirname, '..', '.env');

    // Check if the private key exists
    if (fs.existsSync(privateKeyPath)) {
        const envData = fs.readFileSync(privateKeyPath, 'utf-8');
        const match = envData.match(/PRIVATE_KEY=([^\n]*)/);
        if (match) {
            const privateKeyBase64 = match[1].trim();
            if (privateKeyBase64) {
                const privateKeyPem = Buffer.from(privateKeyBase64, 'base64').toString('utf-8');
                try {
                    const privateKey = crypto.createPrivateKey({ key: privateKeyPem, format: 'pem' });
                    const publicKey = crypto.createPublicKey(privateKey);
                    return { privateKey, publicKey };
                } catch (err) {
                    console.error("Error creating private or public key:", err);
                    return null;
                }
            }
        }
    } else {
        // Generate new RSA keys if the private key does not exist
        try {
            const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 2048,
                publicKeyEncoding: { type: 'spki', format: 'pem' },
                privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
            });

            // Export the private key in PEM format and then convert to Base64 for storage
            const privateKeyPem = privateKey.export({ type: 'pkcs8', format: 'pem' });
            const privateKeyBase64 = Buffer.from(privateKeyPem).toString('base64');
            fs.appendFileSync(privateKeyPath, `PRIVATE_KEY=${privateKeyBase64}\n`);

            return { privateKey, publicKey };
        } catch (err) {
            console.error("Error generating new RSA keys:", err);
            return null;
        }
    }
};

const encryptData = (data, publicKey) => {
    const aesKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-gcm', aesKey, iv);
    const encryptedData = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();

    const encryptedAesKey = publicEncrypt(publicKey, aesKey);

    return {
        key: encryptedAesKey.toString('base64'),
        iv: iv.toString('base64'),
        data: encryptedData.toString('base64'),
        tag: tag.toString('base64'),
    };
};

const decryptData = (encryptedAesKey, iv, data, tag, privateKey) => {
    const aesKey = privateDecrypt(privateKey, Buffer.from(encryptedAesKey, 'base64'));

    const decipher = crypto.createDecipheriv('aes-256-gcm', aesKey, Buffer.from(iv, 'base64'));
    decipher.setAuthTag(Buffer.from(tag, 'base64'));

    const decryptedData = Buffer.concat([
        decipher.update(Buffer.from(data, 'base64')),
        decipher.final(),
    ]);

    return decryptedData.toString('utf8');
};

module.exports = {
    generateRSAKeys,
    encryptData,
    decryptData,
};























// const generateRSAKeys = () => {
//     // console.log("Private key path...");
//     const privateKeyPath = path.join(__dirname, '..', '.env');

//     if (fs.existsSync(privateKeyPath)) {
//         // console.log("True.");
//         // console.log(`privateKeyPath: ${privateKeyPath}`);

//         // console.log("if private key exist...");
//         const envData = fs.readFileSync(privateKeyPath, 'utf-8');
//         // console.log("EnvData successful...");

//         const match = envData.match(/PRIVATE_KEY=([^\n]*)/);
//         if (match) {
//             const privateKeyBase64 = match[1].trim();
//             if (privateKeyBase64) {
//                 // console.log("privateKeyBase64 successful...");
//                 const privateKeyPem = Buffer.from(privateKeyBase64, 'base64').toString('utf-8');
//                 // console.log("privateKeyPem successful...");

//                 try {
//                     const privateKey = crypto.createPrivateKey({ key: privateKeyPem, format: 'pem', type: 'pkcs8' });
//                     const publicKey = crypto.createPublicKey({ key: privateKey, format: 'pem', type: 'spki' });
//                     return { privateKey, publicKey };
//                 } catch (err) {
//                     console.error("Error creating private or public key:", err);
//                 }
//             }
//         }
//     }

//     // console.log("Generating new RSA keys...");
//     const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
//         modulusLength: 2048,
//         publicKeyEncoding: { type: 'spki', format: 'pem' },
//         privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
//     });

//     // console.log(`privateKey: ${privateKey}`);
//     // console.log(`publicKey: ${publicKey}`);

//     const privateKeyPem = privateKey.export({ type: 'pkcs8', format: 'pem' });
//     const privateKeyBase64 = Buffer.from(privateKeyPem).toString('base64');
//     fs.appendFileSync(privateKeyPath, `PRIVATE_KEY=${privateKeyBase64}\n`);

//     return { privateKey, publicKey };
// };
