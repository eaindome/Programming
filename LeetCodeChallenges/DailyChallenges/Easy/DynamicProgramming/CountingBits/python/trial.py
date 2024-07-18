n = 2
ans = [0] * (n+1)

for i in range(1, n+1):
    ans[i] = ans[i//2] + i % 2
    # ans[i] = ans[i >> 1] + (i & 1)
    print(f"ans[{i}] = {ans[i]}")