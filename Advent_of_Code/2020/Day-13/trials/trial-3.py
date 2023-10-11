timestamp = 939
bus_id = [7,13,"x","x",59,"x",31,19]

bus_available = [bus for bus in bus_id if bus != "x"]

bus_times = {}

for bus in bus_available:
    # calculate the number of trips before or at the given timestamp
    trips_before_timestamp = timestamp // bus

    # calculate the next departure time after the timestamp
    next_departure = (trips_before_timestamp + 1) * bus

    bus_times[bus] = next_departure

# find the bus with the shortest waiting time
earliest_bus = min(bus_times, key=bus_times.get)

# calculate the waiting time for the earliest bus
waiting_time = bus_times[earliest_bus] - timestamp

# calculate the result
result = earliest_bus * waiting_time

print(f"Earliest bus: {earliest_bus}\n"
      f"Waiting time: {waiting_time}\n"
      f"Result: {result}")


