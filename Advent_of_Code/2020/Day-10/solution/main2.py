## Simplified code
def main():
    with open("./input.txt", "r") as file:
        adapters = [int(line.strip()) for line in file]

    adapters.sort()     # sort the adapters in ascending orer
    adapters.insert(0, 0)  # add the charging outlet
    adapters.append(adapters[-1] + 3)  # add the built-in adapter

    # initialize a list to store the numbers of distinct arrangements
    # for each adapter
    arrangement_counts = [0] * len(adapters)
    #print(f"arrangement counts: {arrangement_counts}\n")
    arrangement_counts[0] = 1 # there's only one way to  the charging outlet

    # loop through the adapters and calculate the number of distinct arrangements
    for i in range(1, len(adapters)):
        for j in range(i):
            if adapters[i] - adapters[j] <= 3:
                arrangement_counts[i] += arrangement_counts[j]

    # the final answer in the list is in the arrangement_counts[-1]
    total_arrangements = arrangement_counts[-1]
    print(f"Total distinct arrangements: {total_arrangements}")

if __name__ == "__main__":
    main()