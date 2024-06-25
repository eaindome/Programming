operations = {
    '../': -1,
    './': 0,
}

logs = ["d1/","d2/","../","d21/","./"]
logs = ["d1/","d2/","./","d3/","../","d31/"]
# logs = ["d1/","../","../","../"]

current_depth = 0
for log in logs:
    if log in operations:
        move = operations[log]
        if move == -1 and current_depth > 0:
            current_depth -= 1
    else:
        current_depth += 1

print(f"Current depth: {current_depth}")
