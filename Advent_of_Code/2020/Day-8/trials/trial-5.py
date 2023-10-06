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

def run_program(program):
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
        instruction = program[instruction_index]
        if instruction_index in executed_instruction:
            return None

        executed_instruction.add(instruction_index)
        operation, argument = program[instruction_index]
        

        if operation == "acc":
            acc += argument
        elif operation == "jmp":
            instruction_index += argument - 1

        print(f"Accumulator at instruction {instruction}:{instruction_index} = {acc}")

        instruction_index += 1
        '''
        if acc > 6:
            break'''
    return acc

for i, (operation, argument) in enumerate(program):
    if operation == "nop" or operation == "jmp":
        modified_program = program.copy()

        if operation == "nop":
            modified_program[i] = ("jmp", argument)
        elif operation == "jmp":
            modified_program[i] = ("nop", argument)

        result = run_program(modified_program)

        if result is not None:
            print(f"Modified program with instruction {i} changed: Final accumulator value = {result}")
            break









# The Hanging Tree
# Harriet - Stand Up
# Moulin Rouge - Come What May
# A star is born