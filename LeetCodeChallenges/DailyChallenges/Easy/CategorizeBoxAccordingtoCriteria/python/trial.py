result = []
length = 200
width = 50
height = 800
mass = 50

volume = length * width * height
if length >= (10**4) or width >= (10**4) or height >= (10**4) or mass >= (10**4) or volume >= (10**9):
    result.append("Bulky")
if mass >= 100:
    result.append("Heavy")

if "Bulky" in result and "Heavy" in result:
    print("Both")
elif not result:
    print("Neither")
else:
    print(result[0])
