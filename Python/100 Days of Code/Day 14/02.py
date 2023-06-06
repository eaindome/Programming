# Higher or Lower

from random import randint
from art import logo, vs
from game_data import data

# a function that checks the scores of both followers and returns the greater one
# modifying the previous function
# a function that takes the user input, compares 2 scores and returns either 'True' or 'False'
def followers(more_follows, score_A, score_B):
    if more_follows == 'A' and (score_A > score_B):
        return True
    elif more_follows == 'B' and (score_B > score_A):
        return True
    else:
        return False

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
# vs
print(f"Against B: {data[celeb_B]['name']}, {data[celeb_B]['description']}, {data[celeb_B]['country']}") 

# ask for user input
more_follows = input("Who has more followers?\nType 'A' or 'B': ")

# retrieve the scores for both numbers
score_A = data[celeb_A]['follower_count']
score_B = data[celeb_B]['follower_count']
print(score_A, score_B)

# check the scores and compare them
result = followers(more_follows, score_A, score_B)
if result == True:
    print("You win!")
else:
    print("You lose")
