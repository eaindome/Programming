class AllergenAssessment:
    def __init__(self, foods):
        self.__foods = foods
        self.__allergen_mapping = {}    # dictionay to store mapping of allergens to possible ingredients

    def process_foods(self):
        all_ingredients = []    # list to store all ingredients
        all_allergens = set()   # set to store all allergens

        # check each food and update the list of all ingredients and the set of all allergens
        for food in self.__foods:
            ingredients, allergens = self.parse_food(food)
            all_ingredients.extend(ingredients)
            all_allergens.update(allergens)

        # for each allergen, find the possible ingredients that could contain it
        for allergen in all_allergens:
            possible_ingredients = set(all_ingredients)
            for food in self.__foods:
                if allergen in food['allergens']:
                    possible_ingredients.intersection_update(food['ingredients'])
            self.__allergen_mapping[allergen] = possible_ingredients

    def parse_food(self, food):
        ingredients = set(food['ingredients'])   # convert list of ingredients to set
        allergens = set(food['allergens'])      # convert list of allergens to set
        return ingredients, allergens

    def eliminate_allergens(self):
        # while there are allergents that are only in one ingredient, eliminate them
        while any(len(ingredients) > 1 for ingredients in self.__allergen_mapping.values()):
            # for each allergen, if it is only in one ingredient, remove it from all other ingredients
            for allergen, ingredients in self.__allergen_mapping.items():
                if len(ingredients) == 1:
                    ingredient = next(iter(ingredients))
                    for other_allergen in self.__allergen_mapping:
                        if other_allergen != allergen and ingredient in self.__allergen_mapping[other_allergen]:
                            self.__allergen_mapping[other_allergen].remove(ingredient)

    def count_non_allergen_ingredients(self):
        non_allergen_ingredients = set()        # set to contain all non-allergen ingredients
        for ingredients in self.__allergen_mapping.values():
            non_allergen_ingredients.update(ingredients)

        # count the number of times non-allergen ingredients appear in the foods
        count = sum(ingredient not in non_allergen_ingredients for food in self.__foods for ingredient in food['ingredients'])
        return count

if __name__ == "__main__":
    def parse_food(line):
        ingredients, allergens = line.split(' (contains ')
        ingredients = set(ingredients.split())
        allergens = set(allergens[:-1].split(', '))  # remove trailing parenthesis before splitting
        return {'ingredients': ingredients, 'allergens': allergens}

    with open('input.txt', 'r') as file:
        foods = [parse_food(line.strip()) for line in file]  # use strip() to remove newline characters

    #print(f"Foods: {foods}\n")
    
    allergen_assessment = AllergenAssessment(foods)
    allergen_assessment.process_foods()             # process the foods to find possible ingredients for each allergen
    allergen_assessment.eliminate_allergens()       # eliminate allergens that are only in one ingredient
    result = allergen_assessment.count_non_allergen_ingredients()

    print("Number of times non-allergen ingredients appear:", result)