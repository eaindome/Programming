# Function with inputs
'''
Syntax for basic function:
    def my_functions():
        # Do this 
        # Then do this
        # Finally do this

Syntax for functions with inputs:
    def my_function(something):
        # Do this with something
        # Then do this
        # Finally do this
'''

# Review:
# Create a function called greet().
# Write 3 print statements inside the function.
# Call the greet() function and run your code.

def greet():
    print("Hello!")
    print("How do you do?")
    print("Isn't the weather nice today?")

greet()
print()

# function that allows for input
def greet_with_name(name):
    print(f"Hello {name}")
    print("How do you do?")
    print("Isn't the weather nice today?")
greet_with_name("James")