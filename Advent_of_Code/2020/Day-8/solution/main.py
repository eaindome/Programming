def find_acc_value(program):
    acc = 0                         # accumulator
    instruction_index = 0           # instruction index
    executed_instruction = set()    # keep track of executed instructions

    while instruction_index < len(program):
        # check if instruction has been executed once
        if instruction_index in executed_instruction:
            break
        
        executed_instruction.add(instruction_index)      # if not, add to set to keep track
        operation, argument = program[instruction_index] # unpack operation and argument of instruction
        #instruction = program[instruction_index]

        if operation == "acc":
            acc += argument
        elif operation == "jmp":
            instruction_index += argument - 1 # subtract to account for loop increment

        #print(f"Accumulator at instruction {instruction}:{instruction_index} = {acc}")

        instruction_index += 1  # move to next instruction
    
    return acc

def main():
    # open the input file and read the instructions
    with open("./input.txt", "r") as file:
        instructions = [line.strip() for line in file]

    # parse the instructions and store them in the program list
    program = []
    for instruction in instructions:
        operation, argument_str = instruction.split()
        argument = int(argument_str)
        program.append((operation, argument))

    acc = find_acc_value(program=program)
    print(f"Final accumulator value: {acc}")

if __name__ == "__main__":
    main()