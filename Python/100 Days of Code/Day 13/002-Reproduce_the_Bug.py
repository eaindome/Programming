# Describe Problem
#def my_function():
    #for i in range(1, 20):     # this was the proble
#    for i in range(1, 21):     # this is the solution
#        if i == 20:
#            print("You got it")
#my_function()


# Reproduce the Bug
from random import randint
dice_imgs = ["1", "2", "3", "4", "5", "6"]
# dice_num = randint(1, 6)                      # this was the problem
dice_num = randint(0, 5)                        # this was my solution
print(dice_num)
print(dice_imgs[dice_num])
