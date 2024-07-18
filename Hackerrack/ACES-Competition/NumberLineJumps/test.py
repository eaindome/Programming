x1, v1 = 0, 3
x2, v2 = 4, 2

if v1 > v2 and (x2 - x1) % (v1 - v2) == 0:
    print("YES")
else:
    print("NO")

'''
x1 + v1 * t = x2 + v2 * t
v1 * t - v2 * t = x2 - x1
t = (x2 - x1) / (v1 - v2)

if t is a positive integer, then the kangaroos will land on the same location at the same time


The expression (x2 - x1) % (v1 - v2) == 0 checks if the two objects will meet at some point. 
If the difference in their starting positions (x2 - x1) is exactly divisible by the difference in 
their velocities (v1 - v2), then the two objects will meet. 
This is because the first object is catching up to the second object at a rate of (v1 - v2) units per time step, 
so if the initial gap (x2 - x1) is a multiple of (v1 - v2), then the first object will eventually catch up to the second object.

The condition v1 > v2 ensures that the first object is moving faster than the second object. 
If the second object is moving faster, then the first object will never be able to catch up, 
regardless of their initial positions.

If both conditions are met, the code prints "YES", 
indicating that the first object will catch up to the second object. 
Otherwise, it prints "NO".
'''