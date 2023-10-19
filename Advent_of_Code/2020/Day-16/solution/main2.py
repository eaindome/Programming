def is_valid(value, field_ranges):
    for range_min, range_max in field_ranges:
        if range_min <= value <= range_max:
            return True
    return False

def main():
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

    # filter out valid nearby tickets
    valid_nearby_tickets = [ticket for ticket in nearby_tickets if all(any(is_valid(value, field_ranges) for _, field_ranges in field_validity) for value in ticket)]

    num_positions = len(valid_nearby_tickets[0])
    possible_fields = [set(field[0] for field in field_validity) for _ in range(num_positions)]

    # determine possible fields for each position based on the valid tickets
    for ticket in valid_nearby_tickets:
        for position, value in enumerate(ticket):
            for field_name, field_ranges in field_validity:
                if not is_valid(value, field_ranges):
                    possible_fields[position].discard(field_name)

    # deduce the field position
    field_positions = [None] * num_positions

    # repeatedly find positions withonlyone possible field and assign time
    while None in field_positions:
        for position, fields in enumerate(possible_fields):
            if len(fields) == 1:
                field_name = fields.pop()
                field_positions[position] = field_name

                # remove the assigned field from other positions
                for other_fields in possible_fields:
                    other_fields.discard(field_name)

    # determine the values for your ticket based on field positions
    your_ticket_values = {field_name: your_ticket[position] for position, field_name in enumerate(field_positions)}

    print(f"Your Ticket Values: {your_ticket_values}")

if __name__ == "__main__":
    main()