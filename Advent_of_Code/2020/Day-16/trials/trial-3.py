def is_valid(value, field_ranges):
    for range_min, range_max in field_ranges:
        if range_min <= value <= range_max:
            return True
    return False


# read data from the input file
with open('./input.txt', 'r') as file:
    lines = file.read().splitlines()

# parse the field validity ranges
field_validity = []
for line in lines:
    if line == '':
        break
    field, ranges = line.split(': ')
    range_strs = ranges.split(' or ')
    field_ranges = [(int(rng.split('-')[0]), int(rng.split('-')[1])) for rng in range_strs]
    field_validity.append((field, field_ranges))

# find your ticket 
your_ticket_index = lines.index('your ticket:')
your_ticket = list(map(int, lines[your_ticket_index + 1].split(',')))

# find nearby tickets
nearby_tickets_index = lines.index('nearby tickets:')
nearby_tickets = [list(map(int, ticket.split(','))) for ticket in lines[nearby_tickets_index + 1:]]

invalid_values = []

for ticket in nearby_tickets:
    for value in ticket:
        if all(not is_valid(value, field_ranges=field_ranges) for _, field_ranges in field_validity):
            invalid_values.append(value)

print(f"Invalid values: {invalid_values}\n"
      f"Scanning Error Rate: {sum(invalid_values)}")