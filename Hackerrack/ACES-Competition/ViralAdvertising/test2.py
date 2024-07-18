# Define a function viralAdvertising that takes an integer n as input
def viralAdvertising(n):
    # Initialize the number of people who receive the advertisement on the first day
    shared = 5
    
    # Initialize a counter for the total number of likes
    liked = 0
    
    # For each day from 1 to n
    for _ in range(n):
        # Add the number of likes each day to the total (half of the people who receive it)
        liked += shared // 2
        
        # Update the number of people who will receive the advertisement the next day
        # (each person who likes the advertisement shares it with 3 friends)
        shared = (shared // 2) * 3
    
    # Return the total number of likes after n days
    return liked

# Test the function with n = 3
# The expected output is 9, because 2 people like the advertisement on the first day,
# 3 people like it on the second day, and 4 people like it on the third day
print(viralAdvertising(3))  # Output: 9