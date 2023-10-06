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
instruction = program[0]  # ("nop", 0)
operation = instruction[0]  # "nop"
argument = instruction[1]  # 0

print(f"instruction: {instruction}\n"
      f"operation: {operation}\n"
      f"argument: {argument}")

for instruction in program:
    operation, argument = instruction
    if operation == "acc":
        acc += argument
    elif operation == "jmp":
        # jump the number of lines per argument and perform opration
        ...
    