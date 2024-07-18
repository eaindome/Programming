arr = [1, 1, 0, -1, -1]
n = len(arr)
pos, neg, zero = 0, 0, 0

for i in arr:
    if i > 0:
        pos += 1
    elif i < 0:
        neg += 1
    else:
        zero += 1

print(f"ratio of positives: {format(pos/n, '.6f')}\n"
      f"ratio of negatives: {format(neg/n, '.6f')}\n"
      f"ratio of zero: {format(zero/n, '.6f')}")
