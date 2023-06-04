############ Debugging ################


# Describe Problem
def my_function():
    #for i in range(1, 20):         # this was the problem
    for i in range(1, 21):          # this is the solution
        if i == 20:
            print("You got it")
my_function()

