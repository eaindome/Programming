# optimization
import numpy as np

with open("./input.txt", "r") as file:
    seat_layout = [line.strip() for line in file]

# convert seat_layout to a numpy array
seat_layout = np.array([list(row) for row in seat_layout])
empty = "L"
occupied = "#"
floor = "."

def count_visible_occupied(seat_layout, row, col):
    directions = [
        (-1,-1), (-1,0), (-1,1),
        (0, -1), (0, 1), 
        (1, -1), (1, 0), (1, 1)
    ]
    visible_occupied = 0
    for dr, dc in directions:
        r, c = row + dr, col + dc
        while 0 <= r < seat_layout.shape[0] and 0 <= c < seat_layout.shape[1]:
            if seat_layout[r, c] == occupied:
                visible_occupied += 1
                break
            elif seat_layout[r,c] == empty:
                break

            r += dr
            c += dc
    return visible_occupied

def update_seat_layout(seat_layout):
    new_layout = seat_layout.copy()
    for row in range(seat_layout.shape[0]):
        for col in range(seat_layout.shape[1]):
            current_seat = seat_layout[row, col]
            if current_seat == empty:
                if count_visible_occupied(seat_layout, row, col) == 0:
                    new_layout[row, col] = occupied     # occupy the seat
            elif current_seat == occupied:
                if count_visible_occupied(seat_layout, row, col) >= 5:
                    new_layout[row, col] = empty        # vacate the seat
    return new_layout

while True:
    new_layout = update_seat_layout(seat_layout)
    if np.array_equal(new_layout, seat_layout):
        break                                   # no more changes, exit loop

    seat_layout = new_layout

# count occupied seat layout
occupied_seats = np.count_nonzero(seat_layout == "#")
print(f"Occupied seats: {occupied_seats}")