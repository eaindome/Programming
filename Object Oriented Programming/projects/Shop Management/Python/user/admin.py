from data.adminData import AdminData
from management.shop import Shop
from management.inventory import Inventory
from management.cashierRegistry import CashierRegistry
from user.cashier import Cashier
from user.customer import Customer
from management.item import Item

class Admin:
    def __init__(self, admin_id, name, username, password):
        self.admin_id = admin_id
        self.name = name
        self.username = username
        self.password = password

    # Methods for shop management
    def manage_inventory(self, shop, action, item, new_properties=None):
        inventory = shop.inventory
        if action == "add":
            inventory.add_item_to_inventory(item)
        elif action == "remove":
            inventory.remove_item_from_inventory(item)
        elif action == "update" and new_properties is not None:
            inventory.update_item_details(item, new_properties)

    def register_cashier(self, shop, cashier):
        cashier_registry = shop.cashier_registry
        cashier_registry.add_cashier(cashier)

    def manage_customers(self, shop, action, customer):
        customers = shop.customers
        if action == "add":
            customers.append(customer)
        elif action == "remove":
            customers.remove(customer)

    def record_sales(self, shop, items, cashier, customer):
        sales_history = shop.sales_history
        sales_history.append((items, cashier, customer))

    def generate_sales_report(self, shop):
        sales_history = shop.sales_history
        # Generate a sales report based on sales_history

    def handle_payment(self, customer, total_price, payment_method):
        # Process payment for a customer
        pass

# Example usage
"""
if __name__ == "__main__":
    # Creating an Admin object
    admin = Admin(1, "Admin Name", "admin_username", "admin_password")

    # Example usage of shop management methods
    shop = Shop()
    item = Item("Sample Item", "A test item", 19.99, 100, "Electronics", 1001)
    cashier = Cashier("Cashier Name", 1, "cashier_username", "cashier_password")
    customer = Customer("Customer Name", "12345")
    admin.manage_inventory(shop, "add", item)
    admin.register_cashier(shop, cashier)
    admin.manage_customers(shop, "add", customer)
    admin.record_sales(shop, [item], cashier, customer)
    admin.generate_sales_report(shop)
    admin.handle_payment(customer, 19.99, "Credit Card")
"""

