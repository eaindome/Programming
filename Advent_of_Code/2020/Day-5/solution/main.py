def find_highest_seat_ID(binary_spaces):
    seat_IDs = []               # empty list to store seat IDs

    # iterate through space
    for space in binary_spaces:
        # intialize row range
        row_low, row_high = 0, 127

        # initialize column range
        col_low, col_high = 0, 7

        # iterate through the first 7 characters to find the row
        for char in space[:7]:
            mid = (row_low + row_high) // 2
            if char == 'F':
                row_high = mid
            elif char == 'B':
                row_low = mid + 1
        
        # iterate throught the last 3 characters to find the column
        for char in space[7:]:
            mid = (col_low + col_high)//2
            if char == 'L':
                col_high = mid
            elif char == 'R':
                col_low = mid + 1
                
        seat_ID = (row_low * 8) + col_low     # calculate the seat ID
        seat_IDs.append(seat_ID)            # add the id to the list
        highest_seat_ID = max(seat_IDs)     # find the highest seat ID
    
    # return the highest seat id
    return highest_seat_ID

    

def main():
    with open("./input.txt", "r") as file:
        binary_spaces = [line.strip() for line in file]
    
    highest_seat_ID = find_highest_seat_ID(binary_spaces)
    print(f"The highest seat ID is: {highest_seat_ID}")

if __name__ == "__main__":
    main()