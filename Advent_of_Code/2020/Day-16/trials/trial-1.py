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

invalid_ticket = []

"""for range_min, range_max in field_validity:
    if range_min <= nearby_tickets[0][0] <= range_max:
        print('okay')
    else:
        print('not okay')"""

for _, field_ranges in field_validity:
    print(f"Field ranges: {field_ranges}")
    for range_min, range_max in field_ranges:
        print(f"Range-min: {range_min}; Range-max: {range_max}")


# next trial
