length = 200
width = 50
height = 800
mass = 50

volume = length * width * height
is_bulky = length >= (10**4) or width >= (10**4) or height >= (10**4) or mass >= (10**4) or volume >= (10**9)
is_heavy = mass >= 100

if is_bulky and is_heavy:
    print("Both")
elif not is_bulky and not is_heavy:
    print("Neither")
elif is_bulky:
    print("Bulky")
else:
    print("Heavy")