n = 10
n_str = str(n)

count = 0
for i in n_str:
    if i != "0":
        remainder = n % int(i)
        if remainder == 0:
            count += 1

print(f"count: {count}")