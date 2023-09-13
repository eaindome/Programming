import {delete_item_from_inventory, get_current_admin, get_inventory_list} from "../modules.js";

document.addEventListener("DOMContentLoaded", async (event) => {
    await get_current_admin()

    const inventory_list = await get_inventory_list()

    const inventory_list_element = document.querySelector("#inventories")

    for (const inventory of inventory_list) {
        const row = document.createElement("tr")

        const name = document.createElement("td")
        name.innerText = inventory.name

        const price = document.createElement("td")
        price.innerText = inventory.price

        const quantity = document.createElement("td")
        quantity.innerText = inventory.quantity

        const action = document.createElement("td")
        const delete_button = document.createElement("button")
        delete_button.classList.add("bi", "bi-trash3", "btn", "btn-outline-danger")
        delete_button.setAttribute("id", inventory.id)

        delete_button.addEventListener("click", async (event) => {
            await delete_item_from_inventory(event.target.id)

            row.remove()
        })

        action.appendChild(delete_button)

        row.appendChild(name)
        row.appendChild(price)
        row.appendChild(quantity)
        row.appendChild(action)

        inventory_list_element.appendChild(row)

    }

})



