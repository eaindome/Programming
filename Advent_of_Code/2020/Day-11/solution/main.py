# optimization
import numpy as np

empty = "L"
occupied = "#"  
floor = "."

def check_adjacent_seat(seat_layout, row, col):
    directions = [
        (-1,-1), (-1,0), (-1,1),
        (0, -1), (0, 1), 
        (1, -1), (1, 0), (1, 1)
    ]
    occupied_seats = 0
    for dr, dc in directions:
        r, c = row + dr, col + dc
        if 0 <= r < seat_layout.shape[0] and 0 <= c < seat_layout.shape[1] and seat_layout[r, c] == "#":  # Corrected the value here
            occupied_seats += 1
    return occupied_seats

def update_seat_layout(seat_layout):
    new_layout = seat_layout.copy()
    for row in range(seat_layout.shape[0]):
        for col in range(seat_layout.shape[1]):
            current_seat = seat_layout[row, col]
            if current_seat == empty:
                if check_adjacent_seat(seat_layout, row, col) == 0:
                    new_layout[row, col] = occupied     # occupy the seat
            elif current_seat == occupied:
                if check_adjacent_seat(seat_layout, row, col) >= 4:
                    new_layout[row, col] = empty        # vacate the seat
    return new_layout

def main():
    with open("./input.txt", "r") as file:
        seat_layout = [line.strip() for line in file]

    # convert seat_layout to a numpy array
    seat_layout = np.array([list(row) for row in seat_layout])

    while True:
        new_layout = update_seat_layout(seat_layout)
        if np.array_equal(new_layout, seat_layout):
            break                                   # no more changes, exit loop

        seat_layout = new_layout

    occupied_seats = np.count_nonzero(seat_layout == "#")  # Corrected the value here
    print(f"Occupied seats: {occupied_seats}")

if __name__ == "__main__":
    main()
