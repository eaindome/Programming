inventory = {
    "Elf-1": [1000, 2000, 3000],
    "Elf-2": [4000],
    "Elf-3": [5000, 6000],
    "Elf-4": [7000, 8000, 9000], 
    "Elf-5": [1000]
}

highest = 0
summation = 0
Elf = ''

'''
for elf in inventory:
    for x in inventory[elf]:
        sum += x
    if sum > highest:
        highest = sum
        Elf = elf
        
    sum = 0

print(f"{Elf} has the highest calories\n"
        f"The highes calories is {highest}")'''

# print(inventory.items())

for elf, calories in inventory.items():
    '''
    print(elf)
    print()
    print(calories)
    print(type(calories))'''
    # print(sum(calories))
    calories_sum = sum(calories)
    if calories_sum > highest:
        highest = calories_sum
        Elf = elf

print(f"The elf with the highest calories is {Elf}\n"
      f"The highest calories in the inventory is {highest}")

