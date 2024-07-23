// query strings for companies

const getUser = "SELECT username, password, role FROM users WHERE username = $1";

const addManufacturer = "INSERT INTO companies (name, location, address, product_name, product_serial_code, username) VALUES ($1, $2, $3, $4, $5, $6)";

const addPrimaryDistributor = "INSERT INTO primary_distributors (company, location, address, username) VALUES ($1, $2, $3, $4)";

const addSecondaryDistributor = "INSERT INTO secondary_distributors (company, location, address, username) VALUES ($1, $2, $3, $4)";

const addRetailerComp = "INSERT INTO retailers (company, location, address, username) VALUES ($1, $2, $3, $4)";

const enterCode = "INSERT INTO fda (company_name, fda_code) VALUES ($1, $2)";

const checkApproval = "SELECT fda FROM companies WHERE id = $1";

const updateApproval = "UPDATE companies SET fda = TRUE WHERE id = $1";

const getCompanyId = "SELECT id FROM companies WHERE name = $1"


module.exports = {
    getUser,
    addManufacturer,
    addPrimaryDistributor,
    addSecondaryDistributor,
    addRetailerComp,
    enterCode,
    checkApproval,
    updateApproval,
    getCompanyId
}

// {
//     "username": "ekow",
//     "password": "Eai@810675",
//     "role": "manufacturer"
//   }