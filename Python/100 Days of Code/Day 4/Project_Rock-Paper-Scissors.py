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

choice = int(input("What do you choose?\nType 0 for Rock, 1 for Paper or 2 for Scissors:\n"))

if choice == 0:
    print(rock)
elif choice == 1:
    print(paper)
elif choice == 2:
    print(scissors)

import random

print("computer's choice: ")
computer_choice = random.randint(0, 2)

if computer_choice == 0:
    print(rock)
elif computer_choice == 1:
    print(paper)
elif computer_choice == 2:
    print(scissors)

if choice == computer_choice:
    print("It ends in a stallment, play again!")
elif choice == 0:
    if computer_choice == 1:
        print("Paper beats rock, you lose!")
    else:
        print("Rock beats scissors, computer loses. Congrats!!!")
elif choice == 1:
    if computer_choice == 0:
        print("Paper beats rock, computer loses. Congrats!!!")
    else:
        print("Scissors beats paper, you lose!")
else:
    if computer_choice == 0:
        print("Rock beats scissors , you lose!")
    else:
        print("Scissors beats paper, computer loses. Congrats!!!")

# Solution in 2