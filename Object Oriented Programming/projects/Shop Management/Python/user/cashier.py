class Cashier:
    def __init__(self, name, ID, username, password):
        self.__name = name
        self.__cashierID = ID
        self.__cashier_username = username
        self.__password = password

    # getters and setters for cashier properties
    # name
    def get_name(self): return self.__name
    def set_name(self, name): self.__name = name

    # id
    def get_cashierID(self): return self.__cashierID
    def set_cashierID(self, id): self.__cashierID = id

    # username
    def get_username(self): return self.__cashier_username
    def set_username(self, username): self.__cashier_username = username

    # password
    def get_password(self): return self.__password
    def set_password(self, password): self.__password = password



# Example usage
"""
if __name__ == "__main__":
    # Creating Cashier object
    cashier = Cashier("John Doe", 12345, "john_cashier", "password123")

    # Accessing and modifying cashier properties
    print("Cashier Name:", cashier.get_name())
    print("Cashier ID:", cashier.get_cashierID())
    print("Cashier Username:", cashier.get_username())
    print("Cashier Password:", cashier.get_password())

    # Modifying cashier properties
    cashier.set_name("Jane Smith")
    cashier.set_cashierID(54321)
    cashier.set_username("jane_cashier")
    cashier.set_password("newpassword456")

    # Displaying updated cashier properties
    print("Updated Cashier Name:", cashier.get_name())
    print("Updated Cashier ID:", cashier.get_cashierID())
    print("Updated Cashier Username:", cashier.get_username())
    print("Updated Cashier Password:", cashier.get_password())
"""
