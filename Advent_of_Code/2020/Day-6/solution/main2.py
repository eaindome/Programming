def main():
    # create an empty list to store counts
    count_list = []

    # open file and read input data
    with open("./input.txt") as file:
        groups = file.read().strip().split('\n\n') # split groups by blank lines

    for group in groups:
        individual_answers = group.split('\n') # split groups by line

        # use first person's answers as the initial set of common answers
        common_answers = set(individual_answers[0])

        # iterate through each person's answers to find common answers
        for person_answers in individual_answers[1:]:
            common_answers.intersection_update(person_answers)

        # count the number of unique "yes" answers in the group
        count = len(common_answers)

        # add count to the list
        count_list.append(count)
    
    # sum total counts in the list
    total_count = sum(count_list)
    print(f"Count List: {count_list}\n"
          f"Total Counts: {total_count}")
    
if __name__ == "__main__":
    main()