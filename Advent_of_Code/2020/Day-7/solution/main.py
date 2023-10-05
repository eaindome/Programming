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


def find_colors_containing(target_color, rules):
    containing_colors = []
    for bag_color, inner_bags in rules.items():
        if target_color in inner_bags:
            containing_colors.append(bag_color)
            containing_colors.extend(find_colors_containing(bag_color, rules))
    return containing_colors

def main():
    input_file = "./input.txt"
    rules = parse_rules(input_file)

    target_color = "shiny gold" # make sure to use the exact color name used in the input file
    num_bags_containing_color = set(find_colors_containing(target_color, rules))
    print(f"Bags that can contain at least 1 shiny-gold bag: "
        f"{len(num_bags_containing_color)}")
    
if __name__ == "__main__":
    main()