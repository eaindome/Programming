letters = {
    "F": "Front",
    "B": "Back",
    "R": "Right",
    "L": "Left"
}

binary_spaces = [
    "FBFBBFFRLR",
    "BFFFBBFRRR",
    "FFFBBBFRRR",
    "BBFFBBFRLL"
]

seat_IDs = []

for space in binary_spaces:
    # initialize the row range
    row_low, row_high = 0, 127

    # initialize the column range
    col_low, col_high = 0, 7

    # iterate through the first 7 characters to find the row
    for char in space[:7]:
        mid = (row_low + row_high) // 2
        if char == 'F':
            row_high = mid
        elif char == 'B':
            row_low = mid + 1
    #print()
    #print(f"mid: {mid}, row_low: {row_low}, row_high: {row_high}")

    # Iterate through the last 3 characters to find the column
    for char in space[7:]:
        mid = (col_low + col_high) // 2
        if char == 'L':
            col_high = mid
        elif char == 'R':
            col_low = mid + 1
    #print()
    print(f"mid: {mid}, col_low: {col_low}, col_high: {col_high}")

    # Calculate the seat ID and add it to the list
    seat_ID = row_low * 8 + col_low
    seat_IDs.append(seat_ID)

# Find the highest seat ID
highest_seat_ID = max(seat_IDs)
print(f"Binary spaces: {binary_spaces}")
print(f"List of seat IDs: {seat_IDs}")
print(f"The highest seat ID is: {highest_seat_ID}")

'''
with open("./input.txt", "r") as file:
    bin_space = [line.strip() for line in file]

if bin_space == binary_spaces:
    print("correct")
'''