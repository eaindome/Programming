num = "52"

output = ""
for i in range(len(num)):
    # print(num[i])
    if int(num[i]) % 2 != 0:
        output += num[i]
print(f"output: {output}")

