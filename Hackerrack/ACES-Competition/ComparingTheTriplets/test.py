a = [1, 2, 3]
b = [3, 2, 1]
alice, bob = 0, 0
score = []

for i in range(3):
    if a[i] > b[i]:
        alice += 1
    elif a[i] < b[i]:
        bob += 1
score.append(alice)
score.append(bob)

print(f"Scores: {score}")
