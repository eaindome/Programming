expense_report = [979, 366, 299, 675, 1456, 1721]

#print(len(expense_report))
def find_sum(list):
    for a in range(len(list)):
        for b in range(a+1, len(list)):
            if list[a] + list[b] == 2020:
                return list[a], list[b]

num1, num2 = find_sum(expense_report)
ans = num1 * num2
print(f"Num-1: {num1}\nNum-2: {num2}")
print(f"Product: {ans}")