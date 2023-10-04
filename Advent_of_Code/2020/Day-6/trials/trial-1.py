answered_questions = [
    "abc", 
    ['a', 'b', 'c'],
    ["ab", "ac"],
    ['a','a','a','a'],
    "b"
]

count = 0
count_list = []
print(f"length: {len(answered_questions)}")
print(f"len of first object: {len(answered_questions[0])}")

for answer in answered_questions:
    i = 0
    count_a = answered_questions[i].count('a')
    count_b = answered_questions[i].count('b')
    count_c = answered_questions[i].count('c')
    count = count_a + count_b + count_c

    count_list.append(count)
    count = 0
    i += 0

print(f"count list: {count_list}")





