# Higher or Lower

from random import randint
from art import logo, vs
from game_data import data

# a function that checks the scores of both followers and returns the greater one
def followers(score_A, score_B):
    if score_A > score_B:
        return score_A
    elif score_B > score_A:
        return score_B
    else:
        return "Equal"

# retrieving the number of items in our dataset   
num_celebrity = len(data) - 1

# picking two random numbers
celeb_A = randint(1, num_celebrity)
celeb_B = randint(1, num_celebrity)

# if both random numbers are the same, change the second one
if celeb_A == celeb_B:
    celeb_B = randint(1, num_celebrity)

# comparing one celebrity to the other statements
print(f"Compare A: {data[celeb_A]['name']}, {data[celeb_A]['description']}, {data[celeb_A]['country']}") 
score_A = data[celeb_A]['follower_count']
print(f"Against B: {data[celeb_B]['name']}, {data[celeb_B]['description']}, {data[celeb_B]['country']}") 
score_B = data[celeb_B]['follower_count']

# checking the result of comparison
print(f"Result: {followers(score_A, score_B)}")

print(score_A, score_B)
