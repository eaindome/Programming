with open("./input.txt", "r") as file:
    instructions = [line.strip() for line in file]

program = []
for instruction in instructions:
    operation, argument_str = instruction.split()
    argument = int(argument_str)
    program.append((operation, argument))

def find_acc_value(program):
    acc = 0
    instruction_index = 0
    executed_instructions = set()

    while instruction_index < len(program):
        if instruction_index in executed_instructions:
            return None
        
        executed_instructions.add(instruction_index)
        operation, argument = program[instruction_index]

        if operation == "acc":
            acc += argument
        elif operation == "jmp":
            instruction_index += argument - 1

        instruction_index += 1

    return acc

for i, (operation, argument) in enumerate(program):
    if operation == "nop" or operation == "jmp":
        modified_program = program.copy()

        if operation == "nop":
            modified_program[i] = ("jmp", argument)
        elif operation == "jmp":
            modified_program[i] = ("nop", argument)

        result = find_acc_value(modified_program)
        if result is not None:
            print(f"Modified program with instruction {i} changed: Final accumulator value = {result}")
            break