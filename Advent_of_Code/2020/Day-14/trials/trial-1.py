# found this code online, testing it out
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

sum = 0
memory = {}
program = [
    "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
    "mem[8] = 11",
    "mem[7] = 101",
    "mem[8] = 0"
]

current_bit_mask = None

for line in program:
    if line.startswith("mask = "):
        # update the current bitmask
        current_bit_mask = line[7:]
    else:
        # parse the memory address and value
        parts = line.split(" = ")
        address = int(parts[0][4:-1])
        value = int(parts[1])

        # apply the bitmask to the value and store it in memory
        if current_bit_mask is not None:
            memory[address] = apply_bitmask(value=value, bitmask=current_bit_mask)  

print(f"Memory: {memory}\n")
for address, value in memory.items():
    sum += value
    print(f"Memory {address}: {value}")

print(f"Sum of values left in memory: {sum}")


"""test = apply_bitmask(value=..., bitmask=...)
print(f"test: {test}")"""


