num = [1,2,0,0]
k = 34

# Convert the list of digits to a single integer, add k, then convert back to a list of digits
result_array = [int(i) for i in str(int(''.join(map(str, num))) + k)]

print(f"Result Array: {result_array}")