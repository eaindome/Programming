input_text =  """1000
2000
3000

4000

5000
6000

7000
8000
9000

10000"""

elf_inventories = []
current_inventory = []

lines = input_text.strip().split('\n')
'''print(lines)

for line in lines:
    if line.strip():
        current_inventory.append(int(line))
print(current_inventory)'''

for line in lines:
    if line.strip():
        current_inventory.append(int(line))
    else:
        if current_inventory:
            elf_inventories.append(current_inventory)
        current_inventory = []

print(f"\nCurrent inventory: {current_inventory}")
print(f"Elf inventories: {elf_inventories}")

if current_inventory:
    elf_inventories.append(current_inventory)

print(f"\nCurrent inventory: {current_inventory}")
print(f"Elf inventories: {elf_inventories}")

elf_calories = [sum(inventory) for inventory in elf_inventories]
print(f"\nELf calories: {elf_calories}")
    
# Find the Elf with the most Calories and their total Calories
max_calories = max(elf_calories)
print(f"\nMaximum calories: {max_calories}")

max_calories_elf_index = elf_calories.index(max_calories)
print(f"\nmax calories index: {max_calories_elf_index}")
# max_calories, 
print(f"\nElf with highest clories: Elf-{max_calories_elf_index + 1}")
