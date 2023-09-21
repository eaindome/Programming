
def elf_with_highest_calories(input_text):
    elf_inventories = []
    current_inventory = []
    lines = input_text.strip().split('\n')

    for line in lines:
        if line.strip():
            current_inventory.append(int(line))
        else:
            if current_inventory:
                elf_inventories.append(current_inventory)
            current_inventory = []

    if current_inventory:
        elf_inventories.append(current_inventory)

    elf_calories = [sum(inventory) for inventory in elf_inventories]
        
    # Find the Elf with the most Calories and their total Calories
    max_calories = max(elf_calories)

    max_calories_elf_index = elf_calories.index(max_calories)

    return max_calories, max_calories_elf_index+1


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

maximum_calories, elf = elf_with_highest_calories(input_text=input_text)
print(f"Elf-{elf} has the most calories of {maximum_calories}")

# time complexity may still be reduced -> solution 3