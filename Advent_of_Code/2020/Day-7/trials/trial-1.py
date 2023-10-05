'''
rules = [
    {
        "light-red": {
            "bright-white": 1,
            "muted-yellow": 2
        }
    },
    {
        "dark-orange": {
            "bright-white": 3,
            "muted-yellow": 4
        }
    },
    {
        "bright-white": {
            "shiny-gold": 1
        }
    },
    {
        "muted-yellow": {
            "shiny-gold": 2,
            "faded-blue": 9
        }
    },
    {
        "shiny-gold": {
            "dark-olive": 1,
            "vibrant-plum": 2
        }
    },
    {
        "dark-olive": {
            "faded-blue": 3,
            "dotted-black": 4
        }
    },
    {
        "vibrant-plum": {
            "faded-blue": 5,
            "dotted-black": 6
        }
    },
    {
        "faded-blue": {}
    },
        {
        "dotted-black": {}
    }
]'''

rules = {
    "light-red": {
        "bright-white": 1,
        "muted-yellow": 2
    },
    "dark-orange": {
        "bright-white": 3,
        "muted-yellow": 4
    },
    "bright-white": {
        "shiny-gold": 1
    },
    "muted-yellow": {
        "shiny-gold": 2,
        "faded-blue": 9
    },
    "shiny-gold": {
        "dark-olive": 1,
        "vibrant-plum": 2
    },
    "dark-olive": {
        "faded-blue": 3,
        "dotted-black": 4
    },
    "vibrant-plum": {
        "faded-blue": 5,
        "dotted-black": 6
    },
    "faded-blue": {},
    "dotted-black": {}
}

colors_that_contain_shiny_gold_bags = []
colors_that_contain_colors_that_contain_shiny_gold_bags = []

for bag_color, inner_bags in rules.items():
    if "shiny-gold" in inner_bags:
        colors_that_contain_shiny_gold_bags.append(bag_color)

print(f"List of bag colors that can contain shiny-gold: {colors_that_contain_shiny_gold_bags}")

i = 0
for bag_color, inner_bags in rules.items():
    if i < len(colors_that_contain_shiny_gold_bags):
        if colors_that_contain_shiny_gold_bags[i] in inner_bags:
            colors_that_contain_colors_that_contain_shiny_gold_bags.append(bag_color)
    else:
        break
    i += 1

print(f"List of bag colors that can contain colors that contain shiny-gold:"
      f"{colors_that_contain_colors_that_contain_shiny_gold_bags}")

num_of_bags_that_can_contain_shiny_gold = len(colors_that_contain_shiny_gold_bags) + len(colors_that_contain_colors_that_contain_shiny_gold_bags)
print(f"Number of bags that can contain at least 1 shiny-gold: "
      f"{num_of_bags_that_can_contain_shiny_gold}")


# not really efficient, let's optimize
