p = 20
d = 3
m = 6
s = 85 # 70
price_list = [p]
while s > m:
    s -= p
    p = max(p - d, m)
    price_list.append(p)
    # print(s)

price_list.pop(-1)
print(f"S: {s}\n"
      f"P: {p}\n"
      f"Price List: {price_list}\n"
      f"Length: {len(price_list)}\n")