field_validity = [
    ('class', [(1, 3), (5, 7)]),
    ('row', [(6, 11), (33, 44)]),
    ('seat', [(13, 40), (45, 50)])
]

your_ticket = [7, 1, 14]

nearby_tickets = [
    [7,3,47],
    [40,4,50],
    [55,2,20],
    [38,6,12]
]

invalid_values = []

def is_valid(value, field_ranges):
    for range_min, range_max in field_ranges:
        if range_min <= value <= range_max:
            return True
    return False

for ticket in nearby_tickets:
    for value in ticket:
        if all(not is_valid(value, field_ranges) for _, field_ranges in field_validity):
            invalid_values.append(value)

print(f"Invalid Values: {invalid_values}")
print(f"Scanning Error Rate: {sum(invalid_values)}")

