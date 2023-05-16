# Leap Year

## Instructions
'''
Write a program that works out whether if a given year is a leap year. A
normal year has 365 days, leap years have 366, with an extra day in
Fegruaty. 
This is how you work out whether if a particular year is a leap year
    on every year that is evenly divisible by 4 **except** 
    every year that is evenly divisible by 100 **unless**
    the year is also evely divisible by 400

e.g. The year is 2000:
2000 / 4 = 500 (Leap)
2000 / 100 = 20 (Not Leap)
2000 / 400 = 5 (Leap)

So the year 2000 is a leap year.

Example Input:
2400
1989

Example Output:
Leap Year
Not a Leap Year
'''

# Don't change the code below
year = int(input("Which year do you want to check: "))

# write your code below this line
if year % 4 == 0:
    if year % 100 == 0:
        if year % 400 == 0:
            print(f"{year} is a Leap Year.")
        else:
            print(f"{year} is not a Leap Year.")
    else:
        print(f"{year} is a Leap Year.")
else:
    print(f"{year} is not a Leap Year.")

