scores = [10, 5, 20, 20, 4, 5, 2, 25, 1]

for i in range(len(scores)):
    if i == 0:
        high_score = scores[i]
        low_score = scores[i]
        high_count, low_count = 0, 0
    else:
        if scores[i] > high_score:
            high_score = scores[i]
            high_count += 1
        elif scores[i] < low_score:
            low_score = scores[i]
            low_count += 1

print(f"Scores: {[high_count, low_count]}")
