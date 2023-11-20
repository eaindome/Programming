class AllergenAssessment:
    def __init__(self, foods):
        self.foods = foods
        self.allergen_mapping = {}

    def process_foods(self):
        all_ingredients = []
        all_allergens = set()

        for food in self.foods:
            ingredients, allergens = self.parse_food(food)
            all_ingredients.extend(ingredients)
            all_allergens.update(allergens)

        for allergen in all_allergens:
            possible_ingredients = set(all_ingredients)
            for food in self.foods:
                if allergen in food['allergens']:
                    possible_ingredients.intersection_update(food['ingredients'])
            self.allergen_mapping[allergen] = possible_ingredients

    def parse_food(self, food):
        ingredients = set(food['ingredients'])
        allergens = set(food['allergens'])
        return ingredients, allergens

    def eliminate_allergens(self):
        while any(len(ingredients) > 1 for ingredients in self.allergen_mapping.values()):
            for allergen, ingredients in self.allergen_mapping.items():
                if len(ingredients) == 1:
                    ingredient = next(iter(ingredients))
                    for other_allergen in self.allergen_mapping:
                        if other_allergen != allergen and ingredient in self.allergen_mapping[other_allergen]:
                            self.allergen_mapping[other_allergen].remove(ingredient)

    def count_non_allergen_ingredients(self):
        non_allergen_ingredients = set()
        for ingredients in self.allergen_mapping.values():
            non_allergen_ingredients.update(ingredients)

        count = sum(ingredient not in non_allergen_ingredients for food in self.foods for ingredient in food['ingredients'])
        return count

if __name__ == "__main__":
    # Example usage with the given food list
    foods = [
        {'ingredients': {'mxmxvkd', 'kfcds', 'sqjhc', 'nhms'}, 'allergens': {'dairy', 'fish'}},
        {'ingredients': {'trh', 'fvjkl', 'sbzzf', 'mxmxvkd'}, 'allergens': {'dairy'}},
        {'ingredients': {'sqjhc', 'fvjkl'}, 'allergens': {'soy'}},
        {'ingredients': {'sqjhc', 'mxmxvkd', 'sbzzf'}, 'allergens': {'fish'}}
    ]

    allergen_assessment = AllergenAssessment(foods)
    allergen_assessment.process_foods()
    allergen_assessment.eliminate_allergens()
    result = allergen_assessment.count_non_allergen_ingredients()

    print("Number of times non-allergen ingredients appear:", result)

