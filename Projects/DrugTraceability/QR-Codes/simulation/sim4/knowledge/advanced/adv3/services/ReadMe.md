**<ins>Data Security Service Documentation</ins>**

**Overview**
The dataSecurityService.js module provides functions for generating RSA key pairs, encrypting data using a combination of RSA and AES encryption, and decrypting data. This ensures secure data transmission and storage by leveraging robust encryption techniques.

**Dependencies**
The module depends on the following Node.js built-in modules:
- crypto: For cryptographic operations.
fs: For filesystem operations.
- path: For handling and transforming file paths.

**Functions**
`generateRSAKeys`
+ This function generates a pair of RSA keys (private and public) if they do not already exist. 
+ If a private key is found in the .env file, it retrieves and uses it to create the corresponding public key. 
+ If no private key is found, it generates a new pair of RSA keys and stores the private key in the .env file in Base64 format.

`encryptData`
+ This function encrypts the given data using AES-256-GCM for data encryption and RSA for encrypting the AES key. 
+ It returns an object containing the encrypted AES key, initialization vector (IV), encrypted data, and authentication tag.

+ Parameters
- data (string): The data to be encrypted.
- publicKey (object): The RSA public key for encrypting the AES key.

`decryptData`
+ This function decrypts data that was encrypted using encryptData. 
+ It uses the RSA private key to decrypt the AES key and then uses the AES key to decrypt the data.

+ Parameters
- encryptedAesKey (string): The Base64 encoded encrypted AES key.
- iv (string): The Base64 encoded initialization vector used for AES encryption.
- data (string): The Base64 encoded encrypted data.
- tag (string): The Base64 encoded authentication tag.
- privateKey (object): The RSA private key for decrypting the AES key.

**Conclusion**
The dataSecurityService.js module provides a secure way to handle data encryption and decryption using a combination of RSA and AES encryption. It ensures that sensitive data can be securely transmitted and stored, protecting it from unauthorized access.






