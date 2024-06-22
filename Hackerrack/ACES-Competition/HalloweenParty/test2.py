# Initialize the variable k
from builtins import print


k = 6

# Check if k is an even number
if k % 2 == 0:
    # If k is even, divide it by 2 using integer division (//)
    half_k = k // 2

    # Calculate the square of half_k
    result = half_k * half_k

    # Print the result
    print(result)
else:
    # If k is odd, divide it by 2 using integer division (//)
    half_k = k // 2

    # Calculate the product of half_k and half_k plus 1
    result = half_k * (half_k + 1)

    # Print the result
    print(result)