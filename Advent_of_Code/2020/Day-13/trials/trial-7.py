bus_id = [7, 13, "x", "x", 59, "x", 31, 19]
timestamp = 1068781

# Extract valid bus IDs and their respective offsets
valid_buses = [(bus, -index % bus) for index, bus in enumerate(bus_id) if bus != "x"]

# Initialize the timestamp and step size
current_timestamp = 0
step = 1

for bus, offset in valid_buses:
    while current_timestamp % bus != offset:
        current_timestamp += step

    # Increase the step size to maintain the previous buses' departures
    step *= bus

earliest_timestamp = current_timestamp
print(f"The earliest timestamp is {earliest_timestamp}")

