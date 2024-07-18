a = [3, 2, 1, 2, 3]
indexes = {}
for i, num in enumerate(a):
    if num not in indexes:
        indexes[num] = [i]
    else:
        indexes[num].append(i)

print(f"indexes: {indexes}")

min_distance = float('inf')
for value in indexes.values():
    if len(value) > 1:
        for i in range(len(value) - 1):
            min_distance = min(abs(value[i+1] - value[i]), min_distance)

if min_distance == float('inf'):
    min_distance = -1

print(f"min_distance: {min_distance}")


            


