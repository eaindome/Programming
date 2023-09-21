
total_calories = []

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

sum = 0
for x in inventory["Elf-1"]:
    sum += x
print(sum)
total_calories.append(sum)
print(total_calories)

'''
for elf in inventory:
    # print(elf)
    print(inventory[elf])'''