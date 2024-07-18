from builtins import print, range
import math

a1, b1 = 3, 9
a2, b2 = 17, 24
a3, b3 = 24, 49
count = 0
roots = []

for i in range(a1, b1+1):
    root = math.sqrt(i)
    if root == int(root):
        count += 1
        roots.append(i)