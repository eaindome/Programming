from ..user.cashier import Cashier

class CashierRegistry:
    def __init__(self):
        self.__registered_cashiers = []

    # function to add a cashier
    def add_cashier(self, cashier):
        self.__registered_cashiers.append(cashier)

    # function to remove a cashier
    def remove_cashier(self, cashier):
        self.__registered_cashiers.remove(cashier)

    # function to authenticate cashier
    def authenticate_cashier(self, username, password):
        for cashier in self.__registered_cashiers:
            if cashier.get_username() == username and cashier.get_password() == password:
                return True
        return False

# Example usage
"""
# to run this script directly, you'll need cashier.py in the same directory 
and to remove the relative imports

if __name__ == "__main__":
    # Creating CashierRegistry object
    cashier_registry = CashierRegistry()

    # Registering cashiers
    cashier1 = Cashier("Cashier 1", 1001, "cashier1", "password1")
    cashier2 = Cashier("Cashier 2", 1002, "cashier2", "password2")
    cashier_registry.add_cashier(cashier1)
    cashier_registry.add_cashier(cashier2)

    # Authenticating a cashier
    username = "cashier2"
    password = "password2"
    authenticated = cashier_registry.authenticate_cashier(username, password)
    if authenticated:
        print(f"{username} is authenticated.")
    else:
        print(f"{username} is not authenticated.")
"""
