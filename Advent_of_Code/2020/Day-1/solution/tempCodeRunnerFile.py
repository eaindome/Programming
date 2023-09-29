def main():
    with open("./input.txt", "r") as file:
        expense_report = [int(line.strip()) for line in file]
    target_sum = 2020
    result = find_two_numbers(expense_report, target_sum)

    if result:
        product = result[0] * result[1]
        print(f"Product: {product}")

if __name__ == "__main__":
    main()