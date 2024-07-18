from builtins import print


def find_last_candy_position(n, m, s):
    # Subtract 1 because Python uses 0-based indexing
    s -= 1

    # Find the position of the last candy
    last_candy_position = (s + m - 1) % n

    # Add 1 because the problem uses 1-based indexing
    return last_candy_position + 1

# Test the function
n = 5  # number of prisoners
m = 2  # number of candies
s = 1  # starting position

print(f"Last position: {find_last_candy_position(n, m, s)}")