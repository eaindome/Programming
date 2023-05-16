## Your Life In Weeks

# Instructions
'''
Create a program using maths and f-strings that tells us how many days, weeks,
months we have left if we live until 90 years old.
It will take your current age as the input and output a message with
out time left in this format:
    You have x days, y weeks, and z months left.
Where x, y and z are replaced with the actual calculated numbers

Example Input
56
Example Output
You have 12410 days, 1768 weeks, and 408 months left.
'''

# Don't change the code below
age = input("What is your current age? ")

# Wtite your code below this line
total_num_years = 90

num_age = int(age)

age_yrs = num_age

remaining_yrs = 90 - age_yrs
remaining_yrs_days = remaining_yrs * 365
remaining_yrs_weeks = remaining_yrs * 52.143
remaining_yrs_months = remaining_yrs * 12

print(f"You have {remaining_yrs_days} days, {round(remaining_yrs_weeks)} weeks, and {remaining_yrs_months} months left.")





