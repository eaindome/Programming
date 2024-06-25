operations = {
    '../': -1,
    './': 0,
}

current_depth = 0
logs = ["d1/","d2/","../","d21/","./"]
logs = ["d1/","d2/","./","d3/","../","d31/"]
logs = ["d1/","../","../","../"]

for log in logs:
    if log in operations:
        current_depth += operations[log]
    else:
        current_depth += 1

if current_depth < 0:
    current_depth = 0
print(f"Current depth: {current_depth}")
