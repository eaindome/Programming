## Simplified code
def main():
    with open("./input.txt", "r") as file:
        adapters = [int(line.strip()) for line in file]

    adapters.sort()     # sort the adapters in ascending orer
    adapters.insert(0, 0)  # add the charging outlet
    adapters.append(adapters[-1] + 3)  # add the built-in adapter

    # place all differences in a list
    differences = [adapters[i+1]-adapters[i] for i in range(len(adapters)-1)]
    jolt_difference_of_1_count = differences.count(1) # count how many differences of 1
    jolt_difference_of_3_count = differences.count(3) # count how many differences of 3

    print(f"Difference of 1: {jolt_difference_of_1_count}")
    print(f"Difference of 3: {jolt_difference_of_3_count}")

if __name__ == "__main__":
    main()