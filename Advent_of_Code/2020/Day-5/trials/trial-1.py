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

low = 0
high = 127
left = 0
right = 7
seat_IDs = []
print(binary_spaces[0][6])

for space in binary_spaces:
    print(space)

while low <= high:
    i = 0
    # mid = low + (high-low)//2

    if binary_spaces[0][i] == 'F':
        high = (high-low)//2
    elif binary_spaces[0][i] == 'B':
        low = (high-low)//2
    i += 1
    if i > 6:
        while left <= right:
            if binary_spaces[0][i] == 'R':
                low = (high-low)//2
            elif binary_spaces[0][i] == 'L':
                high = (high-low)//2
            if i == len(binary_spaces[0]):
                break

print(f"Low: {low}, High: {high}")

# Note: don't run :"D 😂
# optimized in trial 2 using for loops instead of while loops


