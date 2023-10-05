def count_inner_bag_colors(bag_color, rules):
    inner_bag_color = rules[bag_color]
    total_count = 0
    for inner_color, inner_count in inner_bag_color.items():
        total_count += inner_count + inner_count * count_inner_bag_colors(inner_color, rules=rules)
    return total_count

rules = {
    'shiny-gold': {
        'dark-red': 2
    },
    'dark-red': {
        'dark-orange': 2
    },
    'dark-orange': {
        'dark-yellow': 2
    },
    'dark-yellow': {
        'dark-green': 2
    },
    'dark-green': {
        'dark-blue': 2
    },
    'dark-blue': {
        'dark-violet': 2
    },
    'dark-violet': {}
}

bag_color = "shiny-gold"
num_inner_bag_colors = count_inner_bag_colors(bag_color, rules)
print(f"Total number of bags: {num_inner_bag_colors}")