answered_questions = [
    "abc", 
    ['a', 'b', 'c'],
    ["ab", "ac"],
    ['a','a','a','a'],
    "b"
]

count_list = []

for group_answers in answered_questions:
    if isinstance(group_answers, str):
        group_answers = list(group_answers)
    print(f"Group answers: {group_answers}")
    unique_answers = set(group_answers)
    print(f"Uniqure answers: {unique_answers}\n")

    count = len(unique_answers)

    count_list.append(count)

total_count = sum(count_list)
print(f"Count List: {count_list}\n"
      f"Total Count: {total_count}")