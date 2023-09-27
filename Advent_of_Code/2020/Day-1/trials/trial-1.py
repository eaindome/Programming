
index = 0
summation = 0
expense_report = [1721, 979, 366, 299, 675, 1456]


#print(len(expense_report))
def find_sum(list):
    for a in range(len(list)):
        for report in list:
            if list[index] != report:
                summation = list[index] + report
                if summation == 2020:
                    return list[index], report 
        index += 1

num1, num2 = find_sum(expense_report)
# print(f"Num-1: {num1}\nNum-2: {num2}")
ans = num1 * num2
print(ans)

'''
for a in range(len(expense_report)):
    for report in expense_report:
        if expense_report[index] != report:
            summation = expense_report[index] + report
            if summation == 2020:
                print(expense_report[index], report)
                break
            else:
                print(summation)
        else:
            print(expense_report[index])'''



