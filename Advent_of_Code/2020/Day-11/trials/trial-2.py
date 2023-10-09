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
def check_adjacent(row, col):
    adjacent_seats = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),           (0, 1),
        (1, -1), (1, 0), (1, 1)
    ]

    occupied_count = 0

    for dr, dc in adjacent_seats:
        r, c = row + dr, col + dc

        # check if r and c are within valid bounds
        if 0 <= r < len(seat_layout) and 0 <= c < len(seat_layout[0]) and seat_layout[r][c] == "#":
            return True

# iterate over rows and seats
for i, row in enumerate(seat_layout):
    for j, seat in enumerate(row):
        if seat == empty:
            # check adjacent seats for occupancy
            if check_adjacent(i, j):
                seat_layout[i] = seat_layout[i][:j] + occupied + seat_layout[i][j + 1:]
        elif seat == occupied:
            occupied_count = 0

            # check adjacent seats for occupancy
            for dr, dc in [(dr, dc) for dr in [-1, 0, 1] for dc in [-1, 0, 1] if (dr, dc) != (0, 0)]:
                r, c = i + dr, j + dc

                # check if r and c are within valid bounds
                if 0 <= r < len(seat_layout) and 0 <= c < len(seat_layout[0]) and seat_layout[r][c] == "#":
                    occupied_count += 1

            # if there are four or more occupied seats adjacent,
            # mark the seat as empty
            if occupied_count >= 4:
                seat_layout[i] = seat_layout[i][:j] + occupied + seat_layout[i][j + 1:]

        elif seat == floor:
            continue
