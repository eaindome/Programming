from builtins import str, len, print


# nums = [12, 345, 2, 6, 7896]
nums = [555,901,482,1771]

even_count = 0

for i in nums:
    count_num = len(str(i))
    if count_num % 2 == 0:
        even_count += 1

print(f"Even count: {even_count}")