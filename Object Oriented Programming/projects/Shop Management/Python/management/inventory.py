from item import Item

class Inventory:
    def __init__(self):
        self.__items_in_stock = []

    # function to add an item to the inventory
    def add_item_to_inventory(self, item):
        self.__items_in_stock.append(item)

    # function to remove an item from the inventory
    def remove_item_from_inventory(self, item):
        if item in self.__items_in_stock:
            self.__items_in_stock.remove(item)

    # Function to update item details
    def update_item_details(self, item, new_properties):
        if item in self.__items_in_stock:
            # Assuming new_properties is a dictionary with updated item information
            item.set_name(new_properties.get('name', item.get_name()))
            item.set_description(new_properties.get('description', item.get_description()))
            item.set_price(new_properties.get('price', item.get_price()))
            item.set_quantity(new_properties.get('quantity', item.get_quantity()))
            item.set_category(new_properties.get('category', item.get_category()))
            item.set_item_id(new_properties.get('item_id', item.get_item_id()))

    # Function to search for items
    def search_for_items(self, keyword):
        search_results = []
        for item in self.__items_in_stock:
            if keyword in item.get_name() or keyword in item.get_description():
                search_results.append(item)
        return search_results

    # Function to generate inventory reports
    def generate_inventory_report(self):
        report = "Inventory Report:\n"
        for item in self.__items_in_stock:
            report += f"Name: {item.get_name()}\n"
            report += f"Description: {item.get_description()}\n"
            report += f"Price: ${item.get_price()}\n"
            report += f"Quantity: {item.get_quantity()}\n"
            report += f"Category: {item.get_category()}\n"
            report += f"Item ID: {item.get_item_id()}\n"
            report += "\n"
        return report



# Example usage
"""
if __name__ == "__main__":
    # Creating Inventory object
    inventory = Inventory()

    # Adding items to the inventory
    item1 = Item("Item 1", "Description 1", 19.99, 100, "Electronics", 1001)
    item2 = Item("Item 2", "Description 2", 29.99, 50, "Clothing", 1002)
    inventory.add_item_to_inventory(item1)
    inventory.add_item_to_inventory(item2)

    # Updating item details
    new_properties = {
        'name': "Updated Item 2",
        'price': 39.99
    }
    inventory.update_item_details(item2, new_properties)

    # Generating an inventory report
    report = inventory.generate_inventory_report()
    print(report)
"""

