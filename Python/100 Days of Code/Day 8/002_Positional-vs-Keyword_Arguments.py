'''
Syntax for functions with inputs:
    def my_function(something):
        # Do this with something
        # Then do this
        # Finally do this

Positional Arguments:
def my_function(a, b, c):
    # Do this with a
    # Then do this with b
    # Finally do this with c
my_function(a, b, c)

Keyword Arguments:
def my_function(a, b, c):
    # Do this with a
    # Then do this with b
    # Finally do this with c
my_function(a=1, b=2, c=3)
'''

# Create a function called greet().
# Write 3 print statements inside the function.
# Call the greet() function and run your code.

#def greet():
#    print("Hello!")
#    print("How do you do?")
#    print("Isn't the weather nice today?")

#greet()
#print()

# function that allows for input
#def greet_with_name(name):
#    print(f"Hello {name}")
#    print("How do you do?")
#    print("Isn't the weather nice today?")
#greet_with_name("James")

# Functions with more than 1 input
# Positional Argument
def greet_with(name, location):
    print(f"Hello {name}!")
    print(f"What is it like in {location}?")

greet_with("Jane", "Tema")

# Keyword Argument
greet_with(name="Jane", location="Tema")