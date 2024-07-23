**<ins>Shipping Module Documentation</ins>**
*Files:*
- job.shipping.controller.js
- job.shipping.queries.js
- job.shipping.routes.js

``job.shipping.controller.js``
This file contains the controller function for handling the addition of shipping vehicles to the supply chain management system.

*Function:*
1. **addShippingTruck:** Adds a new shipping vehicle.
    - Parameters: 
        req, res
    - Request Body: 
        shipping_truck_number
    - Description: 
        Inserts a new shipping truck into the shipping_trucks table.
    - Response: 
        JSON object with a success message or an error message.

``job.shipping.queries.js``
This file contains the SQL queries used by the controller function to interact with the PostgreSQL database.

*Query:*
- addShippingVehicle: Inserts a new shipping vehicle into the shipping_trucks table.

``job.shipping.routes.js``
This file defines the route for handling HTTP requests related to adding shipping vehicles. The route is protected by the verifyAccessToken middleware to ensure only authenticated users can access it.

*Route:*
- POST /add: Calls addShippingTruck to add a new shipping vehicle.

This module handles the addition of shipping vehicles to the supply chain management system. Ensure to configure your database and environment variables correctly for the module to function as expected.