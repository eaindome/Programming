bus_id = [7,13,"x","x",59,"x",31,19]

timestamp = 1068781
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



