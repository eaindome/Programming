// query strings for shipping module

const addShippingVehicle = "INSERT INTO shipping_trucks (username, shipping_truck_number) VALUEs ($1, $2)";

module.exports = {
    addShippingVehicle
}