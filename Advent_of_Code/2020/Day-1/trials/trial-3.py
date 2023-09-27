def find_sum(list):
    for a in range(len(list)):          # iterate through the list of numbers
        for b in range(a+1, len(list)):     # iterate throught the other numbers in the list
            if list[a] + list[b] == 2020:       # check if sum equals 2020
                return list[a], list[b]             # return numbers whose sum equal 2020

def main():
    with open("./input.txt", "r") as file:
        expense_report = [int(line.strip()) for line in file]
    
    num1, num2 = find_sum(expense_report)
    ans = num1*num2
    print(f"Num-1: {num1}\nNum-2: {num2}")
    print(f"Product: {ans}")

if __name__ == "__main__":
    main()