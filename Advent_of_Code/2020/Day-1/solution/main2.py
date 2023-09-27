def find_sum(report):
    record = list()            # list to track numbers
    for num in report:
        for num2 in report:
            complement = 2020 - num - num2       # complement number to equal 2020
            if complement in record:
                return num, num2, complement    # if complement in set, return number and complement
        record.append(num)

def main():
    with open("./input.txt", "r") as file:
        expense_report = [int(line.strip()) for line in file]
    
    num1, num2, num3 = find_sum(expense_report)
    ans = num1*num2*num3                         # multiply the three numbers
    #print(f"Num-1: {num1}\nNum-2: {num2}\nNum-3: {num3}")
    print(f"Product: {ans}")

if __name__ == "__main__":
    main()