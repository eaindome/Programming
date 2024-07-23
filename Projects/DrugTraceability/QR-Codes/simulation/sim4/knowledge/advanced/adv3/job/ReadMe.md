**<ins>Job Module Documentation</ins>**
*Files:*
- job.controller.js
- job.queries.js
- job.routes.js

``job.controller.js``
This file contains the controller functions for handling various types of companies in the supply chain management system. Each function handles the addition of different types of companies (manufacturer, primary distributor, secondary distributor, retailer) to the database.

*Functions:*
1. **addCompany**: Adds a new manufacturer.
    - Parameters: 
        req, res
    - Request Body: 
        name, location, address, product_name, product_serial_code
    - Description: 
        Inserts a new manufacturer into the companies table.
    - Response: 
        JSON object of the newly added company.

2. **addPDCompany:** Adds a new primary distributor.
    - Parameters: 
        req, res
    - Request Body: 
        company, location, address
    - Description: 
        Inserts a new primary distributor into the primary_distributors table.
    - Response: 
        JSON object of the newly added primary distributor.

3. **addSDCompany:** Adds a new secondary distributor.
    - Parameters: 
        req, res
    - Request Body: 
        company, location, address
    - Description: 
        Inserts a new secondary distributor into the secondary_distributors table.
    - Response: 
        JSON object of the newly added secondary distributor.

4. **addRetailer:** Adds a new retailer.
    - Parameters: 
        req, res
    - Request Body: 
        company, location, address
    - Description: 
        Inserts a new retailer into the retailers table.
    - Response: 
        JSON object of the newly added retailer.
    
``job.queries.js``
This file contains the SQL queries used by the controller functions to interact with the PostgreSQL database.

*Queries:*
- getUser: Retrieves user information.
- addManufacturer: Inserts a new manufacturer into the companies table.
- addPrimaryDistributor: Inserts a new primary distributor into the primary_distributors table.
- addSecondaryDistributor: Inserts a new secondary distributor into the secondary_distributors table.
- addRetailerComp: Inserts a new retailer into the retailers table.
- enterCode: Inserts an FDA code into the fda table.
- checkApproval: Checks the FDA approval status of a company.
- updateApproval: Updates the FDA approval status of a company.
- getCompanyId: Retrieves the company ID based on the company name.

``job.routes.js``
This file defines the routes for handling HTTP requests related to companies. Each route is protected by the verifyAccessToken middleware to ensure only authenticated users can access them.

*Routes:*
- POST /add-company: Calls addCompany to add a new manufacturer.
- POST /add-pd-company: Calls addPDCompany to add a new primary distributor.
- POST /add-sd-company: Calls addSDCompany to add a new secondary distributor.
- POST /add-retailer: Calls addRetailer to add a new retailer.