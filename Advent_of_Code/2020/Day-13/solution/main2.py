def main():
    # open the input file for reading
    with open("./input.txt", "r") as file:
        # read the lines from the file
        lines = file.readlines()

    # extract the timestamp and bus IDs from the lines
    timestamp = int(lines[0].strip())           # convert the first line into an integer
    bus_id = [int(bus) if bus != "x" else bus for bus in lines[1].strip().split(",")]

    # initialize step size
    step = 1

    for index, bus in enumerate(bus_id):
        if bus == "x":
            continue

        # increment the timestamp until we find a valid timestamp
        while (timestamp + index) % bus != 0:
            timestamp += step

        # update the step size to maintain the current buses' departure times
        step *= bus

    print(f"The earliest timestamp is {timestamp}")

if __name__ == "__main__":
    main()