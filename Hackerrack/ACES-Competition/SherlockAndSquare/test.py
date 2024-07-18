from builtins import print, range


a1, b1 = 3, 9
a2, b2 = 17, 24
a3, b3 = 24, 49
count = 0
roots = []

for i in range(a2, b2+1):
    root = i ** 0.5
    if root == int(root):
        count += 1
        roots.append(i)
    # else:
    #     print(f"i: {i}\n"
    #           f"root: {root}\n"
    #           f"int(root): {int(root)}")

print(f"Count: {count}\n"
      f"Roots: {roots}")