# Identation
'''
syntax:
    def my_function():
    ****print("Hello")

    def my_function():
    ****if sky == "clear":
    ********print("blue")
    ****elif sky == "cloudy":
    ********print("grey")
    ****print("Hello")
    print("World")

    # identation implies leaving four spaces before command
    # " * " ---> space
'''
sky = input("How is the sky: ")
def my_function():
    if sky == "clear":
        print("blue")
    elif sky == "cloudy":
        print("grey")
    print("Hello")
print("World")