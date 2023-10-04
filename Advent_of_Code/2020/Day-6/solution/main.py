def main():
    # create an empty list to store counts
    count_list = []

    # open file and read input data
    with open("./input.txt") as file:
        groups = file.read().strip().split('\n\n') # split groups by blank lines

    for group in groups:
        individual_answers = group.split('\n') # split groups by line

        # use a set to automatically eliminate duplicates
        unique_answers = set(''.join(individual_answers))

        # count the number of unique "yes" answers in the group
        count = len(unique_answers)

        # add count to the list
        count_list.append(count)
    
    # sum total counts in the list
    total_count = sum(count_list)
    print(f"Total Counts: {total_count}")
    
if __name__ == "__main__":
    main()