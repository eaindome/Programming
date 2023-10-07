num_set = (
    35, 20, 15, 25, 47, 40, 62, 55, 65, 95,
    102, 117, 150, 182, 127, 219, 299, 277, 309, 576
)

target_sum = 127

for start_index in range(len(num_set)):
    current_sum = 0
    for end_index in range(start_index, len(num_set)):
        current_sum += num_set[end_index]
        if current_sum == target_sum:
            contiguous_set = num_set[start_index:end_index+1]
            print(f"Contiguous set: {contiguous_set}")
            break
        elif current_sum > target_sum:
            break

'''
number = 127
print(num_set[:10])

for i in range(len(num_set[:10])):
    for j in range(i+1, len(num_set[:10])):
        if num_set[i] + num_set[j] == number:
            print(f"Low: {num_set[i]}, High: {num_set[j]}")
'''

