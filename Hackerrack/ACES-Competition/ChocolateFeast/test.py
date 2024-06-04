from builtins import print

n = 15
c = 3
m = 2

he_buys = n // c
# he_buys = 5
wrappers_he_has = he_buys

while wrappers_he_has >= m:
    he_buys += 1
    wrappers_he_has -= m
    wrappers_he_has += 1

print(f"how many he buys: {he_buys}")