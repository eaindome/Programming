adapters = [
    16, 10, 15, 5, 1,
    11, 7, 19, 6, 12, 4
]

j = 1
i, jolt_on_charge = 0, 0
jolt_difference_of_1_count = 0
jolt_difference_of_3_count = 0

adapters.append(jolt_on_charge)
sorted_adapters = sorted(adapters)
inbuilt_adapter_voltage = max(sorted_adapters) + 3

print(sorted_adapters)

for num in range(len(sorted_adapters)-1):
    if sorted_adapters[j] - sorted_adapters[i] == 1:
        jolt_difference_of_1_count += 1
    elif sorted_adapters[j] - sorted_adapters[i] == 3:
        jolt_difference_of_3_count += 1
    i += 1
    j += 1    

# You may also need to account for the built-in adapter
jolt_difference_of_3_count += 1

print(f"Difference of 1: {jolt_difference_of_1_count}")
print(f"Difference of 3: {jolt_difference_of_3_count}")










