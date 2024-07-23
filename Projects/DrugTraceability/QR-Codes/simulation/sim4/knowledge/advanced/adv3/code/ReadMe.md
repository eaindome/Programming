**<ins>Code Module Documentation</ins>**

**Overview**
The code module is responsible for generating QR codes for packs, boxes, and products. It consists of three main components: the controller (code.controller.js), the queries (code.queries.js), and the routes (code.routes.js).

**File Descriptions**
## code.controller.js
This file contains the logic for generating QR codes. It uses a PostgreSQL connection pool to execute queries and the qrcode library to generate QR codes. The QR codes are encrypted using RSA keys.

`generateQRCode`
The generateQRCode function generates QR codes for all packs, boxes, and products of a manufacturer. It checks the user's role and only allows manufacturers to generate QR codes. It also creates directories for each company and date to store the generated QR codes.

## code.queries.js
This file contains the SQL queries related to generating QR codes.

`Queries`
- getCompanyName: Retrieves the company name by ID.
getCompanyPacks: Retrieves the packs of a company created within the last day.
- getCompanyInfo: Retrieves the product name and serial code of a company.
- getBoxes: Retrieves the boxes of a pack created within the last day.
- getProducts: Retrieves the products of a box created within the last day.
- getRole: Retrieves the role of a user by username.
- getCompanyDet: Retrieves the company ID by username.
- insertQrCodePack: Inserts a QR code entry for a pack and returns the generated ID.
- insertQrCodeBox: Inserts a QR code entry for a box and returns the generated ID.
- insertQrCodeProduct: Inserts a QR code entry for a product and returns the generated ID.

## code.routes.js
This file defines the routes for generating QR codes. It uses Express Router to handle HTTP requests and JWT middleware to verify access tokens.

`/generate-qr-code`
The /generate-qr-code route allows authenticated manufacturers to generate QR codes for their packs, boxes, and products. It uses the generateQRCode controller method and the verifyAccessToken middleware to ensure the user is authenticated.

**Testing**
*route*
http://localhost:8000/code/generate-qr-code

*Headers*
Authorisation: Bearer <accesstoken>

**Conclusion**
This code module provides a comprehensive solution for generating encrypted QR codes for packs, boxes, and products in a supply chain management system. By following the structure and examples provided, you can integrate this functionality into your own application.
