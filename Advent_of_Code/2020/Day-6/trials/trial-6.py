def count_common_answers(group_answers):
    common_answers = set(group_answers[0])  # Initialize with the answers of the first person

    for person_answers in group_answers[1:]:
        common_answers.intersection_update(person_answers)  # Update with common answers

    return len(common_answers)

def count_answered_questions(answered_questions):
    count_list = []

    for group_answers in answered_questions:
        count = count_common_answers(group_answers)
        count_list.append(count)
    
    return count_list  # Return the list of counts

def main():
    with open("input.txt", "r") as file:
        groups = file.read().strip().split('\n\n')  # Read and split groups by blank lines
    
    group_lists = [group.split('\n') for group in groups]  # Split group answers by lines

    total_count = sum(count_common_answers(group) for group in group_lists)
    
    count_list = count_answered_questions(group_lists)
    
    print(f"Count List: {count_list}\n"
          f"Total Count: {total_count}")

if __name__ == "__main__":
    main()
