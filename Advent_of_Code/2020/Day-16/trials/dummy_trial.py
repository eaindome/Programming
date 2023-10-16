import re

def parse_input(input_file):
    with open(input_file, 'r') as file:
        sections = file.read().strip().split('\n\n')

        rules_section, your_ticket_section, nearby_tickets_section = sections

        # Parse rules
        rules = {}
        for line in rules_section.split('\n'):
            field, ranges = line.split(': ')
            ranges = re.findall(r'(\d+)-(\d+)', ranges)
            rules[field] = [(int(start), int(end)) for start, end in ranges]

        # Parse your ticket
        your_ticket = list(map(int, your_ticket_section.split('\n')[1].split(',')))

        # Parse nearby tickets
        nearby_tickets = [list(map(int, line.split(','))) for line in nearby_tickets_section.split('\n')[1:]]

        return rules, your_ticket, nearby_tickets

def is_valid_value(value, rules):
    for ranges in rules.values():
        for start, end in ranges:
            if start <= value <= end:
                return True
    return False

def part1(rules, nearby_tickets):
    error_rate = 0
    for ticket in nearby_tickets:
        for value in ticket:
            if not is_valid_value(value, rules):
                error_rate += value
    return error_rate

if __name__ == "__main__":
    rules, your_ticket, nearby_tickets = parse_input("./input.txt")

    error_rate = part1(rules, nearby_tickets)
    print("Ticket scanning error rate:", error_rate)
