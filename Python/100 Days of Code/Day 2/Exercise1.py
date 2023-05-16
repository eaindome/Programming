## Data types

# Instructions
'''
Write a program that adds the digits in a 2 digit number. e.g. 
if the input was 35, the the output should be 3 + 5 = 8.

Example Input:
39
Example Output:
3 + 9 = 12
'''

# Don't change the code below
two_digit_number = input("Type a two digit number: ")

# Write your code below this line
new_2digit_num = str(two_digit_number)

print(new_2digit_num[0]+" + "+new_2digit_num[1]+" = "+str(int(new_2digit_num[0])+int(new_2digit_num[1])))


# Solution given

# check the data type of two_digit_number
print(type(two_digit_number))

# get the first and second digits using subscripting then convert string to int
first_digit = int(two_digit_number[0])
second_digit = int(two_digit_number[1])

# add the two digits together
two_digit_number = second_digit + first_digit

print(two_digit_number)

