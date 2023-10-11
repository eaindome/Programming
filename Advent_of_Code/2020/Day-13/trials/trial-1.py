timestamp = 939
bus_id = [7,13,"x","x",59,"x",31,19]

"""bus_available = bus_id.remove("x")
print(f"Buses: {bus_id}\n"
      f"Buses available: {bus_available}")"""

"""bus_id.remove("x")
print(f"Buses available: {bus_id}")"""

bus = set(bus_id)
bus.discard("x")
bus_available = list(bus)
print(f"Buses available: {bus_available}")


average_time_for_bus_1 = timestamp // bus_available[0]
print(f"Bus ID 7 time: {average_time_for_bus_1}")

time_to_timestamp = average_time_for_bus_1 * bus_available[0]
print(f"Time to timestamp: {time_to_timestamp}")

time_after_timestamp = time_to_timestamp + bus_available[0]
print(f"Time after timestamp: {time_after_timestamp}")
