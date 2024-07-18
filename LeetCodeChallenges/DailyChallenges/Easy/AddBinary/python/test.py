a = "11"
b = "1"
int_a, int_b = int(a, 2), int(b, 2)

bin_sum = bin(int_a+int_b)[2:]
str_bin_sum = str(bin_sum)
print(f"Output: {str_bin_sum}")