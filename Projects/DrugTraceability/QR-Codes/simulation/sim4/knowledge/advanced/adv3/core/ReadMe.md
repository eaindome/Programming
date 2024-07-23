**<ins>Documentation for Core Module</ins>**

**Overview**
The Core Module is responsible for managing the hierarchical structure of packs, boxes, and products within the supply chain management system. It includes functionalities for creating, fetching, and printing the hierarchy.

**Core Structure**
+ controller.js: Contains the logic for handling requests and manipulating the hierarchical data.
+ node.js: Defines the Node class used to represent and manage hierarchical nodes.
+ queries.js: Contains SQL query strings used for interacting with the database.
+ routes.js: Defines the routes for the core module and associates them with the appropriate controller functions.

**controller.js**

*Dependencies:*
- Requires functions from queries.js to fetch and manipulate data.
- Requires a PostgreSQL connection pool from database/database.

*Functions:*

`createHierarchy:`
- Description: Creates a hierarchical structure of packs, boxes, and products for a manufacturer.
- Endpoint: POST /create-hierarchy
- Request Body:
    * num_packs: Number of packs to create (must be a positive integer).
- Authentication: Requires a valid access token. The username is extracted from the token.
- Process:
    * Validates the number of packs.
    * Retrieves user role, product name, manufacturer ID, and company ID using the username.
    * Checks if the user is a manufacturer.
    * Creates packs, boxes, and products in the database.
    * Commits the transaction or rolls back in case of an error.
- Responses:
    * 201 Created: Hierarchy created successfully.
    * 400 Bad Request: Invalid number of packs.
    * 403 Forbidden: User is not a manufacturer.
    * 500 Internal Server Error: Database or server error.

`fetchHierarchy:`
- Description: Fetches the complete hierarchy of packs, boxes, and products for a manufacturer.
- Endpoint: GET /fetch-hierarchy
- Authentication: Requires a valid access token. The username is extracted from the token.
- Process:
    * Retrieves user role and checks if the user is a manufacturer.
    * Fetches all packs, boxes, and products from the database.
    * Constructs the hierarchy and returns it.
- Responses:
    * 200 OK: Returns the hierarchy.
    * 403 Forbidden: User is not a manufacturer.
    * 500 Internal Server Error: Database or server error.

`printHierarchy:`
- Description: Prints the hierarchy of packs, boxes, and products for a manufacturer based on a specific date.
- Endpoint: POST /print-hierarchy
- Request Body:
    * date: The date for which to fetch the hierarchy.
- Authentication: Requires a valid access token. The username is extracted from the token.
- Process:
    * Retrieves user role and company ID using the username.
    * Checks if the user is a manufacturer.
    * Fetches the hierarchy based on the company ID and date.
    * Structures the hierarchy and fetches company information.
    * Returns the structured hierarchy and company information.
- Responses:
    * 200 OK: Returns the hierarchy and company information.
    * 403 Forbidden: User is not a manufacturer.
    * 404 Not Found: No packs found for the given company and date.
    * 500 Internal Server Error: Database or server error.


**node.js**
*Node Class:*

- Description: Represents a node in the hierarchy (pack, box, or product).
- Constructor:
    * name: The name of the node.
    * id: The ID of the node.
    * node_type: The type of node (pack, box, or product).
    * parent: The parent node (default is null).
- Methods:
    * addChild(node): Adds a child node.
    * toString(): Returns the name of the node as a string.
    * printTree(level = 0): Prints the tree structure starting from the current node, with indentation based on the level.


**queries.js**
*Query Strings:*

`Create Hierarchy:`
- getProductByManufacturerName: Fetches the product name of the manufacturer.
- getManufacturereId: Fetches the manufacturer ID by username.
- getRole: Fetches the role of the user by username.
- getCompanyId: Fetches the company ID by username.
- insertPack: Inserts a new pack into the database.
- insertBox: Inserts a new box into the database.
- insertProduct: Inserts a new product into the database.

`Fetch Hierarchy:`
- getAllPacks: Fetches all packs.
- getBoxNameByPackId: Fetches box names by pack ID.
- getProductNameByBoxId: Fetches product names by box ID.

`Print Hierarchy:`
- getCompanyInfo: Fetches company information by company ID.
- getPacksByCompanyAndDate: Fetches packs by company ID and date.
- getBoxesByPackId: Fetches boxes by pack ID.
- getProductsByBoxId: Fetches products by box ID.

`routes.js`
*Description:*

Defines routes for the core module and associates them with the appropriate controller functions.
Uses verifyAccessToken middleware to ensure routes are accessible only to authenticated users.

*Routes:*

- POST /create-hierarchy: Calls createHierarchy from the controller.
- GET /fetch-hierarchy: Calls fetchHierarchy from the controller.
- POST /print-hierarchy: Calls printHierarchy from the controller.





