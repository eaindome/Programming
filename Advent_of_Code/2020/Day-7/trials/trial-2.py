def find_colors_containing(target_color, rules):
    containing_colors = []
    for bag_color, inner_bags in rules.items():
        if target_color in inner_bags:
            containing_colors.append(bag_color)
            containing_colors.extend(find_colors_containing(bag_color, rules))
    return containing_colors


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

target_color = "shiny-gold"
num_bags_containing_color = set(find_colors_containing(target_color, rules))
print(f"Bags that can contain at least 1 shiny-gold bag: "
      f"{len(num_bags_containing_color)}")
