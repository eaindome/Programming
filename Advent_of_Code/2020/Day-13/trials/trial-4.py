# open the input file for reading
with open("./input.txt", "r") as file:
    # read the lines from the file
    lines = file.readlines()

# extract the timestamp and bus IDs from the lines
timestamp = int(lines[0].strip())           # convert the first line into an integer
bus_id = [int(bus) if bus != "x" else bus for bus in lines[1].strip().split(",")]

# extract available bus ids
bus_available = [bus for bus in bus_id if bus != "x"]

# initialize dictionary
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


