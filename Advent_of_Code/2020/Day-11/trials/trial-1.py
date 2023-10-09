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


if seat_layout[0][1] is empty:
    print("False")

i = 0
for seats in seat_layout:
    print(f"seats-{i}: {seats}")
    for seat in seats:
        print(f"seat: {seat}")
        if seats.index(seat) != seats.rfind(seat) or seats.index(seat) != seats.find(seat):
            if seat == empty:
                # check if the adjacent seat is occupied
                # if not, the current seat should be occupied
                ...
            elif seat == occupied:
                # check if four or more seats adjacent to it are empty
                # if so, the seat becomes empty
                ...
            elif seat == floor:
                continue
            ...
        
    i += 1
    break


print(seat_layout[0].rfind("L"))

# some logical errors, move to trial 2