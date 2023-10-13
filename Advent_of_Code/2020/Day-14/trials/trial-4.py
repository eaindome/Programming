# code I found online
from itertools import product

def apply_bitmask(address, bitmask):
    floating_bits = []
    address = list(format(address, '036b'))

    for i in range(36):
        if bitmask[i] == '1':
            address[i] = '1'
        elif bitmask[i] == 'X':
            address[i] = 'X'
            floating_bits.append(i)

    # generate all possible combinations of floating bits
    addresses = []
    for combination in product("01", repeat=len(floating_bits)):
        for i, bit in enumerate(combination):
            address[floating_bits[i]] = bit
        addresses.append(int("".join(address), 2))
    
    return addresses

with open("./input.txt", "r") as file:
    program = [line.strip() for line in file]

sum = 0
memory = {}
current_bitmask = None

for line in program:
    if line.startswith("mask = "):
        current_bitmask = line[7:]
    else:
        parts = line.split(" = ")
        address = int(parts[0][4:-1])
        value = int(parts[1])

        if current_bitmask is not None:
            # apply the bitmask to the address to generate multiple addresses
            addresses = apply_bitmask(address=address, bitmask=current_bitmask)

            # store the value in each generated address
            for addr in addresses:
                memory[addr] = value

print(f"Memory: {memory}\n")

for address, value in memory.items():
    sum += value
print(f"Sum of values left in memory: {sum}")
