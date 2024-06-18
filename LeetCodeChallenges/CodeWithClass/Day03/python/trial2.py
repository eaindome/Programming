from typing import List

def BaseballGame(ops:List[int]) -> List[int]:
    score = []
    for op in ops:
        if op == "C":
            score.pop()
        elif op == "D":
            score.append(score[-1]*2)
        elif op == "+":
            score.append(score[-1]+score[-2])
        else:
            score.append(int(op))
    return sum(score)

# Test cases
print(f"BaseballGame([5,2,'C','D','+']) = {BaseballGame([5,2,'C','D','+'])}")
