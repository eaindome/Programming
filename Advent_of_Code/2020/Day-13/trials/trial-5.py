timestamp = 1068781
bus_id = [7,13,"x","x",59,"x",31,19]

bus_available = [bus for bus in bus_id if bus != "x"]

count  = 0
bus_times = {}

for offset, bus in enumerate(bus_id):
    if bus == "x":
        continue

    # calculate the next departure time after the timestamp
    next_departure = timestamp + count
    if bus in bus_times:
        print(f"Similar departure time {next_departure}: Buses {bus} and {bus_times[bus]}")
    else:
        bus_times[bus] = next_departure

print(f"Bus times: {bus_times}")