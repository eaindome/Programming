

inventory = {
    "Elf-1": [1000, 2000, 3000],
    "Elf-2": [4000],
    "Elf-3": [5000, 6000],
    "Elf-4": [7000, 8000, 9000], 
    "Elf-5": [1000]
}

'''
print(inventory)
print()
print(inventory["Elf-1"])
print(type(inventory["Elf-1"]))
'''

'''
sum = 0
for x in inventory["Elf-1"]:
    sum += x
print(sum)
total_calories.append(sum)
print(total_calories)
'''

highest = 0
sum = 0
for elf in inventory:
    for x in inventory[elf]:
        sum += x
    if sum > highest:
        highest = sum
        result = {elf: highest}
    sum = 0

for elf in result:
    print(f"{elf} has the highest calories\n"
          f"The highes calories is {result}")