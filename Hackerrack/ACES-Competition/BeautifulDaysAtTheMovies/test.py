k = 6
beautiful_day_count = 0
for i in range(20, 24):
    diff = i - (int(str(i)[::-1]))
    if diff % k == 0:
        beautiful_day_count += 1

print(f"Beautiful Days: {beautiful_day_count}")

