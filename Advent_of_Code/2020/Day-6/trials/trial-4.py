def count_answered_questions(answered_questions):
    count_list = []

    for group_answers in answered_questions:
        unique_answers = set(group_answers)
        count = len(unique_answers)
        count_list.append(count)

    #print(f"Count List: {count_list}")
    return count_list  # Return the list of counts

def main():
    with open("input.txt", "r") as file:
        groups = file.read().strip().split('\n\n')  # Read and split groups by blank lines
    
    group_lists = [group.split('\n') for group in groups]  # Split group answers by lines

    total_count = sum(len(set(''.join(group))) for group in group_lists)
    
    count_list = count_answered_questions(group_lists)
    
    print(f"Count List: {count_list}\n"
          f"Total Count: {total_count}")

if __name__ == "__main__":
    main()





