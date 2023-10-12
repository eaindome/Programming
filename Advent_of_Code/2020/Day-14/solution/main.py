def apply_bitmask(value, bitmask):
    for i in range(36):
        if bitmask[i] == '0':
            # set the i-th bit in value to 0 using bitwise AND
            value = value & ~(1 << (35-i))
        elif bitmask[i] == '1':
            # set the i-th bit in value to 1 using bitwise OR
            value = value | (1 << (35-i))
        # for 'X', do nothing (bitwise AND with 1 leaves the bit unchanged)
    return value

def process_program(program):
    memory = {}
    current_bitmask = None

    for line in program:
        if line.startswith("mask = "):
            # update current bitmask
            current_bitmask = line[7:]
        else:
            # parse the memory address and value
            parts = line.split(" = ")
            address = int(parts[00][4:-1])
            value = int(parts[1])

            # apply the bitmask to the value and store it in memory
            if current_bitmask is not None:
                memory[address] = apply_bitmask(value=value, bitmask=current_bitmask)

    return memory

def main():
    with open("./input.txt", "r") as file:
        program = [line.strip() for line in file]

    sum = 0
    memory = process_program(program=program)
    for address, value in memory.items():
        sum += value
    print(f"Sum of values left in memory: {sum}")

if __name__ == "__main__":
    main()