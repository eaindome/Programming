# Import the math module to use the floor function
import math

# Set the number of days for the advertisement to run
n = 3

# Initialize the number of people who receive the advertisement on the first day
num_people = 5

# Initialize a counter for the total number of likes
total_likes = 0

# For each day from 1 to n
for i in range(1, n+1):
    # Calculate the number of people who like the advertisement each day
    # (half of the people who receive it, rounded down)
    num_people = math.floor(num_people/2)
    
    # Add the number of likes each day to the total
    total_likes += num_people
    
    # Calculate the number of people who will receive the advertisement the next day
    # (each person who likes the advertisement shares it with 3 friends)
    shared = num_people * 3
    
    # Update the number of people who will receive the advertisement the next day
    num_people = shared

# Print the total number of likes
print(f"Total likes: {total_likes}")

# Print the number of people who will receive the advertisement on the last day
print(f"Shared: {shared}")