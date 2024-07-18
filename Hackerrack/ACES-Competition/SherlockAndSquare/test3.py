from builtins import print, range
import math

a1, b1 = 3, 9
a2, b2 = 17, 24
a3, b3 = 24, 49

roots = []

# calculate the square roots at the endpoints of the range
start = math.ceil(math.sqrt(a3))
end = math.floor(math.sqrt(b3))

print(f"start: {start}\n"
      f"end: {end}")

# generate the squares of the integers in the range
for i in range(start, end+1):
    roots.append(i**2)
    print(f"i: {i}\n"
          f"i**2: {i**2}\n"
          f"roots: {roots}\n")