b = 3
w = 5
bc = 3
wc = 4
z = 1

cost_b = min(bc, wc + z)
cost_w = min(wc, bc + z)

print(b * cost_b + w * cost_w)