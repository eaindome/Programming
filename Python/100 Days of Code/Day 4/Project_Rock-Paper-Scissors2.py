rock = '''  
    _______
---'   ____)  
      (_____)  
      (_____)  
      (____)
---.__(___)  
'''

paper = '''  
    _______
---'   ____)____  
          ______)  
          _______)  
         _______)
---.__________)  
'''

scissors = '''  
    _______
---'   ____)____  
          ______)  
       __________)  
      (____)
---.__(___)  
''' 

game_images = [rock, paper, scissors]

user_choice = int(input("What do you choose?\nType 0 for Rock, 1 for Paper or 2 for Scissors:\n"))

if user_choice >= 3 or user_choice < 0:
    print("You typed an invalid number, you lose!")

print(game_images[user_choice])

import random
computer_choice = random.randint(0, 2)
print("Computer chose: ")
print(game_images[computer_choice])

if user_choice == computer_choice:
    print("It ends in a stallment, play again!")
elif user_choice == 0:
    if computer_choice == 1:
        print("Paper beats rock, you lose!")
    else:
        print("Rock beats scissors, computer loses. Congrats!!!")
elif user_choice == 1:
    if computer_choice == 0:
        print("Paper beats rock, computer loses. Congrats!!!")
    else:
        print("Scissors beats paper, you lose!")
else:
    if computer_choice == 0:
        print("Rock beats scissors , you lose!")
    else:
        print("Scissors beats paper, computer loses. Congrats!!!")