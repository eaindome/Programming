**<ins>FDA Module Documentation</ins>**
*Files:*
- fda.controller.js
- fda.routes.js

``fda.controller.js``
This file contains the controller functions for handling FDA-related operations, such as entering FDA codes and updating FDA approval statuses.

*Functions:*
1. **enterFDAcode:** Enters an FDA code and updates the FDA approval status.
    - Parameters: 
        req, res
    - Request Body: 
        company_name, fda_code
    - Description: 
        Inserts the FDA code into the fda table and updates the FDA approval status in the companies table.
    - Response: 
        Success or error message.

2. **checkFDAapproval:** Checks the FDA approval status of a company.
    - Parameters: 
        req, res
    - URL Parameters: 
        companyId
    - Description: 
        Retrieves the FDA approval status of a company based on the company ID.
    - Response: 
        JSON object with the FDA approval status.

3. **updateFDAapproval:** Updates the FDA approval status of a company.
    - Parameters: req, res
    - URL Parameters: companyId
    - Description: Updates the FDA approval status of a company in the companies table.
    - Response: Success or error message.

``fda.routes.js``
This file defines the routes for handling HTTP requests related to FDA operations. Each route is protected by the verifyAccessToken middleware to ensure only authenticated users can access them.

*Routes:*
- POST /enterFDAcode: 
    Calls enterFDAcode to enter an FDA code and update the FDA approval status.
- GET /checkFDAapproval/: 
    Calls checkFDAapproval to check the FDA approval status of a company.
- PUT /updateFDAapproval/: 
    Calls updateFDAapproval to update the FDA approval status of a company.







