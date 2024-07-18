from builtins import print

s = 7
t = 11
a = 5
b = 15
m = 3
n = 2
apples = [-2, 2, 1]
oranges = [5, -6]

apple_dist = [a+x for x in apples]
orange_dist = [b+x for x in oranges]

apple_count = 0
orange_count = 0

for i in apple_dist:
    if s <= i <= t:
        apple_count += 1

for i in orange_dist:
    if s <= i <= t:
        orange_count += 1
print(f"Apple Count: {apple_count}\nOrange Count: {orange_count}")
