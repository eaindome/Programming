from builtins import max, print


height = [1, 2, 3, 3, 2]
k = 1

max_height = max(height)
num_doses = max_height - k

if num_doses <= 0:
    print("No doses needed to jump over all the hurdles")
else:
    print(f"Number of doses needed to jump over all the hurdles: {num_doses}")