timestamp = 939
bus_id = [7,13,"x","x",59,"x",31,19]


bus = set(bus_id)
bus.discard("x")
bus_available = list(bus)
print(f"Buses available: {bus_available}")

bus_times = {}
available_times = []

for bus in bus_available:
    average_time_for_bus_1 = timestamp // bus
    #print(f"Bus ID 7 time: {average_time_for_bus_1}")

    time_to_timestamp = average_time_for_bus_1 * bus
    #print(f"Time to timestamp: {time_to_timestamp}")

    time_after_timestamp = time_to_timestamp + bus
    #print(f"Time after timestamp: {time_after_timestamp}")

    bus_times.update({bus: time_after_timestamp})
    available_times.append(time_after_timestamp)

print(f"Available times: {available_times}")
print(f"Available times: {bus_times}\n")

available_times_sorted = sorted(available_times)
print(f"Available times sorted: {available_times_sorted}\n")

shortest_time_arrival = available_times_sorted[0]
id_for_shortest_time_arrival = {i for i in bus_times if bus_times[i] == shortest_time_arrival}
print(f"Shortest time arrival: {shortest_time_arrival}\n"
      f"Id of bus: {id_for_shortest_time_arrival}\n")

waiting_time = shortest_time_arrival - timestamp
id = list(id_for_shortest_time_arrival)[0]
#print(f"ID data type: {type(id)}")

# product of waiting time and bus ID
print(f"Product: {waiting_time*id}")

