seat_layout = [
    "L.LL.LL.LL",
    "LLLLLLL.LL",
    "L.L.L..L..",
    "LLLL.LL.LL",
    "L.LL.LL.LL",
    "L.LLLLL.LL",
    "..L.L.....",
    "LLLLLLLLLL",
    "L.LLLLLL.L",
    "L.LLLLL.LL"
]

empty = "L"
occupied = "#"
floor = "."

# function to check for adjacent seats
def check_adjacent(seat_layout, row, col):
    adjacent_seats = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),           (0, 1),
        (1, -1), (1, 0), (1, 1)
    ]

    occupied_count = 0

    for dr, dc in adjacent_seats:
        r, c = row + dr, col + dc

        # check if r and c are within valid bounds
        if 0 <= r < len(seat_layout) and 0 <= c < len(seat_layout[0]) and seat_layout[r][c] == occupied:
            occupied_count += 1
    return occupied_count

def update_seat_layout(seat_layout):
    new_layout = []

    for row in range(len(seat_layout)):
        new_row = ""
        for col in range(len(seat_layout[0])):
            current_seat = seat_layout[row][col]

            if current_seat == empty:
                if check_adjacent(seat_layout, row, col) == 0:
                    new_row += occupied         # occupy the seat
                else:
                    new_row += empty            # no change
            elif current_seat == occupied:
                if check_adjacent(seat_layout, row, col) >= 4:
                    new_row += empty            # vacate the seat
                else:
                    new_row += occupied         # no change
            else:
                # floor remains unchanged
                new_row += floor
        new_layout.append(new_row)

    return new_layout


def print_seat_layout(seat_layout):
    for row in seat_layout:
        print(row)

# main loop to update seat layout until it stabilizes
while True:
    new_layout = update_seat_layout(seat_layout)

    if new_layout == seat_layout:
        break                   # no more changes, exit the loop

    seat_layout = new_layout

# print out the final seat layout
#print_seat_layout(seat_layout)


# count occupied seats
occupied_seats = sum(row.count(occupied) for row in seat_layout)
print(f"Occupied seats: {occupied_seats}")

