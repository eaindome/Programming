
def elf_with_highest_calories(input_text):
    lines = input_text.strip().split('\n')
    max_calories = 0
    current_calories = 0
    elf_with_highest_calories = 0
    current_elf = 0

    for line in lines:
        if line:
            current_calories += int(line)
        else:
            current_elf += 1
            if current_calories > max_calories:
                max_calories = current_calories
                elf_with_highest_calories = current_elf
            current_calories = 0 

    return max_calories, elf_with_highest_calories


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

highest_calories, elf = elf_with_highest_calories(input_text=input_text)
print(f"Elf-{elf} has the most calories of {highest_calories}")