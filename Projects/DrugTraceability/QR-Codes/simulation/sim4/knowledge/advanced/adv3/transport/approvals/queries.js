// query strings for approvals

const packApproval = "SELECT approval_status FROM packs WHERE pack_id = $1";

const boxApproval = "SELECT approval_status FROM boxes WHERE box_id = $1"; 

const productApproval = "SELECT approval_status FROM products WHERE product_name = $1";

module.exports = {
    packApproval,
    boxApproval,
    productApproval
}