# Describe Problem
#def my_function():
    #for i in range(1, 20):     # this was the proble
#    for i in range(1, 21):     # this is the solution
#        if i == 20:
#            print("You got it")
#my_function()


# Reproduce the Bug
#from random import randint
#dice_imgs = ["1", "2", "3", "4", "5", "6"]
#dice_num = randint(1, 6)                       # this was the problem
#dice_num = randint(0, 5)                       # this was the solution
#print(dice_num)
#print(dice_imgs[dice_num])


# Play Computer and Evaluate Each Line
#year = int(input("What's your year of Birth?: "))
#if year > 1980 and year < 1994:
#    print("You are a millenial")
#elif year > 1994:                          # this was the problem
#elif year >= 1994:                          # this is the solution
#    print("You are a Gen Z.")


# Fix the Error
#age = input("How old are You?: ")          # this was the problem
#age = int(input("How old are You?: "))      # this is the solution
#if age > 18:
#print("You can drive at age {age}")        # this was the problem
#    print(f"You can drive at age {age}")    # this is the solution


# Print is Your Friend
#pages = 0
#word_per_page = 0
#pages = int(input("Number of pages: "))
# word_per_page == int(input("Number of words per page: "))     # this was the problem
#word_per_page = int(input("Number of words per page: "))        # this is the solution
# print(pages)                                                  # using the print statement to check the value in our pages variable
# print(word_per_pages)                                         # using the print statement to check the value in our word per page variable
#total_words = pages * word_per_page
#print(total_words)

# Use a Debugger
def mutate(a_list):
    b_list = []
    for item in a_list:
        new_item = item * 2
        b_list.append(new_item)         # this is the solution
#   b_list.append(new_item)             #this was the problem
    print(b_list)

mutate([1,2,3,5,8,13])


