class Food:
    def __init__(self, ingredients, allergens):
        self.ingredients = set(ingredients)
        self.allergens = set(allergens)

class AllergenAssessment:
    def __init__(self, foods):
        self.foods = foods
        self.allergen_mapping = {}  # To store mapping of allergen to ingredient

    def find_safe_ingredients(self):
        all_ingredients = set()
        for food in self.foods:
            all_ingredients.update(food.ingredients)

        possible_allergen_ingredients = set(all_ingredients)
        for food in self.foods:
            possible_allergen_ingredients.intersection_update(food.ingredients)

        safe_ingredients = all_ingredients - possible_allergen_ingredients
        return safe_ingredients

    def identify_allergen_ingredients(self):
        while len(self.allergen_mapping) < len(set(allergen for food in self.foods for allergen in food.allergens)):
            for food in self.foods:
                unresolved_allergens = food.allergens - set(self.allergen_mapping.keys())
                unresolved_ingredients = food.ingredients - set(self.allergen_mapping.values())

                if len(unresolved_allergens) == 1 and len(unresolved_ingredients) == 1:
                    allergen = unresolved_allergens.pop()
                    ingredient = unresolved_ingredients.pop()
                    self.allergen_mapping[allergen] = ingredient

    def count_non_allergen_ingredients(self):
        safe_ingredients = self.find_safe_ingredients()
        count = sum(len(food.ingredients.intersection(safe_ingredients)) for food in self.foods)
        return count


# Example usage with your provided input
foods_input = [
    Food(["mxmxvkd", "kfcds", "sqjhc", "nhms"], ["dairy", "fish"]),
    Food(["trh", "fvjkl", "sbzzf", "mxmxvkd"], ["dairy"]),
    Food(["sqjhc", "fvjkl"], ["soy"]),
    Food(["sqjhc", "mxmxvkd", "sbzzf"], ["fish"]),
]

allergen_assessment = AllergenAssessment(foods_input)
print("Part 1:", allergen_assessment.count_non_allergen_ingredients())

"""
# Add this code to the end
allergen_assessment.identify_allergen_ingredients()

non_allergen_ingredients = allergen_assessment.find_safe_ingredients()
non_allergen_count = sum(len(food.ingredients.intersection(non_allergen_ingredients)) for food in allergen_assessment.foods)

print("Ingredients without allergens:", non_allergen_ingredients)
print("Count of non-allergen ingredients:", non_allergen_count)
"""

