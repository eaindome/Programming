num = [1,2,0,0]
k = 34

str_num = [str(i) for i in num]
join_str_num = ''.join(str_num)

num_plus_k = int(join_str_num) + k
result = str(num_plus_k)

result_array = [int(j) for j in result]
print(f"Result Array: {result_array}")