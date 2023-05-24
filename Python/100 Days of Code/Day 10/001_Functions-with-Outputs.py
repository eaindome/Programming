# Functions With Outputs

'''
Syntax:
    def my_function():
        #Do this
        #Then do this 
        #Finally do this

    def my_function(something):
        #Do this with something
        #Then do this 
        #Finally do this

    // Functions with Outputs
    def my_function():
        # result = 3 * 2
        # return result
'''

def format_name(f_name, l_name):
    f_name = f_name.lower().title()
    l_name = l_name.lower().title()
    full_name = f_name + " " + l_name
    return full_name

name = format_name(f_name="Ekow", l_name="Indome")
print(name)

# Solution
def format_name(first_name, last_name):
    formated_f_name = first_name.title()
    formated_l_name = last_name.title()
    #print(f"{formated_f_name} {formated_l_name}")
    return f"{formated_f_name} {formated_l_name}"

#formatted_string = format_name("AnGelA", "Yu")
#print(formatted_string)
print(format_name("AnGelA", "Yu"))

#output = len("Angela")

