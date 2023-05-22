# Dictionaries

'''
Syntax:
    {key: value}
    e.g.
    {"Bug": "An error in a program that prevents the program from funning as expected"}
'''
programming_dictionary = {"Bug": "An error in a program that prevents the program from funning as expected",
                          "Function": "A piece of code that you can easily call over and over again.",
}

pd = programming_dictionary
print(f"programming dictionary: {programming_dictionary}\n")

# retrieving items from the dictionary
print(programming_dictionary["Bug"])
print(programming_dictionary["Function"])
print()

# adding new items to the dictionary
programming_dictionary["Loop"] = "The action of doing something overa and over again."
print(programming_dictionary["Loop"])
print()


# creating an empty dictionary
empty_dictionary = {}

# wipe an existing dictionary
print(f"pd: {pd}")
pd = {}
print(f"pd: {pd}\n")

# edit an item in a dictionary
programming_dictionary["Bug"] = "An insect in your computer"
print(f"programming dictionary: {programming_dictionary}\n")

# loop through a dictionary
for key in programming_dictionary:
    print(key)
    print(programming_dictionary)
    print(f"{key}: {programming_dictionary}")


