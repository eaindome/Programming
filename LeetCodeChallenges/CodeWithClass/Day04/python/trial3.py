from memory_profiler import profile

@profile
def minOperations(logs):
    operations = {
        '../': -1,
        './': 0,
    }

    current_depth = 0
    for log in logs:
        if log in operations:
            move = operations[log]
            if move == -1 and current_depth > 0:
                current_depth -= 1
        else:
            current_depth += 1

    return current_depth

logs1 = ["d1/","d2/","../","d21/","./"]
logs2 = ["d1/","d2/","./","d3/","../","d31/"]
logs3 = ["d1/","../","../","../"]

print(f"Current depth for logs1: {minOperations(logs1)}\n"
      f"Current depth for logs2: {minOperations(logs2)}\n"
      f"Current depth for logs3: {minOperations(logs3)}\n")