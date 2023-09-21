
def elf_with_highest_calories(input_text):
    lines = input_text.strip().split('\n')
    max_calories = 0
    current_calories = 0

    for line in lines:
        if line:
            current_calories += int(line)
        else:
            max_calories = max(max_calories, current_calories)
            current_calories = 0

    max_calories = max(max_calories, current_calories)

    return max_calories



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

highest_calories = elf_with_highest_calories(input_text=input_text)

# this doesn't give the elf -> solution 4