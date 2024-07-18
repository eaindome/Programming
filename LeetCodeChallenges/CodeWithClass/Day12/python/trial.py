num = "35427"

for i in range(len(num)-1, -1, -1):
    if int(num[i]) % 2 != 0:
        print(f"num[:i+1]: {num[:i+1]}")