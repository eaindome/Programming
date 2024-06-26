x = 2147483645
bin_x = bin(x)

print(f"Binary of {x}: {bin_x}")
print(type(bin_x))

print(f"Number of 1s: {bin_x.count('1')}")

i = 10
i -= -1
print(f"i: {i}")