n = 5
k = 3
a = [-2, -1, 0, 1, 2]

early, late = 0, 0

for i in a:
    if i <= 0:
        early += 1
    else:
        late += 1

if early < k:
    print("YES")
else:
    print("NO")


# def angryProfessor(k, a):
#     on_time = sum([1 for time in a if time <= 0])
#     return 'YES' if on_time < k else 'NO'