inventory = {
    "Elf-1": [1000, 2000, 3000],
    "Elf-2": [4000],
    "Elf-3": [5000, 6000],
    "Elf-4": [7000, 8000, 9000], 
    "Elf-5": [1000]
}

Elf = ''
highest = 0

for elf, calories in inventory.items():
    calories_sum = sum(calories)
    if calories_sum > highest:
        highest = calories_sum
        Elf = elf

print(f"The elf with the highest calories is {Elf}\n"
      f"The highest calories in the inventory is {highest}")
    
