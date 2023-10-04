answered_questions = [
    ['a', 'b', 'c'], 
    ['a', 'b', 'c'],
    ["a", "b", "a", "c"],
    ['a','a','a','a'],
    ["b"]
]

count_list = []

for group_answers in answered_questions:
    unique_answers = set(group_answers)
    print(f"Group answers: {group_answers}\n"
          f"Unique answers: {unique_answers}\n")

    count = len(unique_answers)

    count_list.append(count)

total_count = sum(count_list)
print(f"Count List: {count_list}\n"
      f"Total Count: {total_count}")