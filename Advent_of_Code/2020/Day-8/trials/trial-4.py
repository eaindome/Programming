# open the input file and read the instructions
with open("./input.txt", "r") as file:
    instructions = [line.strip() for line in file]

# parse the instructions and store them in the program list
program = []
for instruction in instructions:
    operation, argument_str = instruction.split()
    argument = int(argument_str)
    program.append((operation, argument))

acc = 0
instruction_index = 0
executed_instructions = set()

while instruction_index < len(program):
    if instruction_index in executed_instructions:
        break

    executed_instructions.add(instruction_index)
    operation, argument = program[instruction_index]
    
    if operation == "acc":
        acc += argument
    elif operation == "jmp":
        instruction_index += argument - 1

    instruction_index += 1

print(f"Final value in accumulator: {acc}")