
from management.item import Item

class Customer:
    def __init__(
            self, customer_name, 
            customer_username, customer_email,
            customer_password, customer_id,
        ):
        self.__name = customer_name
        self.__username = customer_username
        self.__email = customer_email
        self.__password = customer_password
        self.__customerID = customer_id
        self.__balance = 0.0
        self.cart = {}      # a dictionary to store items in the cart

    # getters and setters for customer attributes
    # name
    def get_name(self): return self.__name
    def set_name(self, name): self.__name = name

    # email
    def get_name(self): return self.__email
    def set_name(self, email): self.__email = email

    # passoword
    def get_password(self): return self.__password
    def set_password(self, password): self.__password = password

    # customer id
    def get_customerID(self): return self.__customerID
    def set_customerID(self, id): self.__customerID = id

    # username 
    def get_username(self): return self.__username
    def set_username(self, username): self.__username = username

    # balance
    def get_balance(self): return self.__balance 
    def set_balance(self, balance): self.__balance = balance

    # generate customer_id
    def generate_customer_id():
        pass

    # adding items to cart
    def add_item_to_cart(self, item, quantity):
        if item.item_id not in self.cart:
            self.cart[item.item_id] = quantity
        else:
            self.cart[item.item_id] += quantity

    # removing items from cart
    def remove_item_from_cart(self, item, quantity):
        if item.item_id in self.cart:
            self.cart[item.item_id] -= quantity
            if self.cart[item.item_id] <= 0:
                del self.cart[item.item_id]

    # calculate total price
    def calculate_total_price(self):
        total_price = 0
        for item, quantity in self.cart_items():
            total_price += item.price * quantity
        return total_price

    # view what's in the cart
    def view_cart(self):
        print("Items in your cart: ")
        for item, quantity in self.cart.items():
            print(f"{item.name} - Quantity: {quantity}")

customer_data = {}  