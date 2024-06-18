score = []
ops = ["5","2","C","D","+"]
for op in ops:
    if op == "C":
        score.pop()
    elif op == "D":
        score.append(score[-1]*2)
    elif op == "+":
        score.append(score[-1]+score[-2])
    else:
        score.append(int(op))
score_sum = sum(score)
print(f"Final score: {score_sum}")
