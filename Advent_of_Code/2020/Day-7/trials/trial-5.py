def parse_rules(filename):
    rules = {}
    with open(filename, 'r') as file:
        for line in file:
            line = line.strip()
            outer_bag, inner_bags_str = line.split(" bags contain ")
            inner_bags = inner_bags_str.split(", ")
            inner_bags_dict = {}
            for bag in inner_bags:
                if bag != "no other bags.":
                    bag = bag.split(" ")
                    quantity = int(bag[0])
                    inner_bag_color = " ".join(bag[1:3])
                    inner_bags_dict[inner_bag_color] = quantity
            rules[outer_bag] = inner_bags_dict
    return rules

def count_inner_bag_colors(bag_color, rules):
    inner_bag_color = rules[bag_color]
    total_count = 0
    for inner_color, inner_count in inner_bag_color.items():
        total_count += inner_count + inner_count * count_inner_bag_colors(inner_color, rules=rules)
    return total_count

input_file = "./input-2.txt"
rules = parse_rules(input_file)

bag_color = "shiny gold" # make sure to use the exact color name used in the input file
num_inner_bag_colors = count_inner_bag_colors(bag_color, rules)
print(f"Total number of bags: {num_inner_bag_colors}")