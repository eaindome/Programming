import { disable_element, enable_element, get_admin_token, get_current_admin } from "../modules"

const BACKEND_ROOT_URL = "http://127.0.0.1:8000"

const add_to_inventory_form = document.querySelector("form")

const save_and_add_another = document.querySelector("#save-and-add-another")



document.addEventListener("DOMContentLoaded", async (event) => {
    await get_current_admin()
})

add_to_inventory_form.addEventListener("submit", async (event) => {
    event.preventDefault()
    event.stopPropagation()

    const name = document.querySelector("#name")
    const price = document.querySelector("#price")
    const quantity = document.querySelector("#quantity")

    disable_element(name_element)
    disable_element(price_element)
    disable_element(quantity_element)

    const form_data = new FormData(add_to_inventory_form);
    const encoded_data = new URLSearchParams(form_data).toString()

    const admin_token = get_admin_token()
    const result = await fetch(`${BACKEND_ROOT_URL}/inventory`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin_token}`
        },
        body: JSON.stringify({
            name: name_element.value, 
            price: price_element.value, 
            quantity: quantity_element.value
        })
    })

    if (result.ok) {
        const token_response = await result.json()
        const access_token = token_response.access_token

        window.localStorage.setItem("admin_token", access_token)
        window.location.href = "/admin/inventories.html"
    }
    else if (result.status === 401){
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        const appendAlert = (message, type) => {
          const wrapper = document.createElement('div')
          wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
        
          alertPlaceholder.append(wrapper)
        }
        const error_message = await result.json()
        appendAlert(error_message.detail, 'danger')

        enable_element(name)
        enable_element(price)
        enable_element(quantity)
    }
    else {
        console.log("An error occurred!")
    }
})