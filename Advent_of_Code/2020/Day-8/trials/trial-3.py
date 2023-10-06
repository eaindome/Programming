program = [
    ("nop", 0),
    ("acc", 1),
    ("jmp", 4),
    ("acc", 3),
    ("jmp", -3),
    ("acc", -99),
    ("acc", 1),
    ("jmp", -4),
    ("acc", 6),
]
acc = 0
instruction_index = 0
executed_instruction = set()

'''
instruction = program[0]  # ("nop", 0)
operation = instruction[0]  # "nop"
argument = instruction[1]  # 0

print(f"instruction: {instruction}\n"
      f"operation: {operation}\n"
      f"argument: {argument}")
'''

while instruction_index < len(program):

    if instruction_index in executed_instruction:
        break

    executed_instruction.add(instruction_index)
    operation, argument = program[instruction_index]
    instruction = program[instruction_index]

    if operation == "acc":
        acc += argument
    elif operation == "jmp":
        instruction_index += argument - 1

    print(f"Accumulator at instruction {instruction}:{instruction_index} = {acc}")

    instruction_index += 1
    '''
    if acc > 6:
        break'''

print(f"\nFinal accumulator value: {acc}")