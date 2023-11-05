class Item:
    def __init__(
            self, 
            name, 
            description, 
            price, 
            quantity, 
            category, 
            item_id
        ):
        self.__name = name
        self.__description = description
        self.__price = price
        self.__quantity = quantity
        self.__category = category
        self.__item_id = item_id

    # getters and setters for item properties
    # name
    def get_name(self): return self.__name
    def set_name(self, name): self.__name = name

    # description
    def get_description(self): return self.__description
    def set_description(self, description): self.__description = description

    # price
    def get_price(self): return self.__price
    def set_price(self, price): self.__price = price

    # quantity
    def get_quantity(self): return self.__quantity
    def set_quantity(self, quantity): self.__quantity = quantity

    # category
    def get_category(self): return self.__category
    def set_category(self, category): self.__category = category

    # item id
    def get_item_id(self): return self.__item_id
    def set_item_id(self, item_id): self.__item_id = item_id

    