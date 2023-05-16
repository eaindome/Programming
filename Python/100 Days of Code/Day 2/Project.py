
print("\tTip Calculator")

print("Welcome to the tip calculator.")

total_bill = input("What was the total bill? $")

percentage_tip = input("What percentage tip would you like to give?\n10, 12, or 15? ")

num_people = input("How many people to split the bill? ")

tip = (float(percentage_tip)/100) * float(total_bill)

bill = tip + float(total_bill)

each_person_pay = bill / int(num_people)

print(f"Each person should pay: ${round(each_person_pay, 2)}")



# Project Solution
print("\nProject Solution Given")
print("Welcome to tip calculator")
bill = float(input("What was the total bill? $"))
tip = int(input("How much tip would you like to give? 10, 12, or 15? "))
people = int(input("How many people to split the bill? "))
tip_as_percent = tip/100
total_tip_amount = bill * tip_as_percent
total_bill = bill + total_tip_amount
bill_per_person = total_bill/people
final_amount = round(bill_per_person, 2)
final_amount = "{:.2f}".format(bill_per_person)
print(f"Each person should pay: ${final_amount}")


