class Food:
    def __init__(self, ingredients, allergens):
        self.ingredients = set(ingredients)
        self.allergens = set(allergens)

    def __repr__(self):
        return f"Food({self.ingredients}, {self.allergens})"

class AllergenAssessment:
    def __init__(self, foods):
        self.foods = foods
        self.allergen_mapping = {}  # To store mapping of allergen to ingredient

    def find_safe_ingredients(self):
        all_ingredients = set()
        for food in self.foods:
            all_ingredients.update(food.ingredients)

        possible_allergen_ingredients = set()
        for allergen in set(allergen for food in self.foods for allergen in food.allergens):
            foods_with_allergen = [food for food in self.foods if allergen in food.allergens]
            allergen_ingredients = set.intersection(*(food.ingredients for food in foods_with_allergen))
            possible_allergen_ingredients.update(allergen_ingredients)

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


def parse_food(line):
    ingredients, allergens = line.split(' (contains ')
    ingredients = ingredients.split()
    allergens = allergens[:-1].split(', ')  # remove trailing parenthesis before splitting
    return Food(ingredients, allergens)

with open('input.txt', 'r') as file:
    foods_input = [parse_food(line.strip()) for line in file]  # use strip() to remove newline characters

allergen_assessment = AllergenAssessment(foods_input)
print("Part 1:", allergen_assessment.count_non_allergen_ingredients())
