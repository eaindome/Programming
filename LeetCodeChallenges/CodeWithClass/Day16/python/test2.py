from builtins import print
import math

nums = [555,901,482,1771]
even_count = 0

for i in nums:
    count_num = math.floor(math.log10(i)) + 1
    if count_num % 2 == 0:
        even_count += 1 

print(f"Even count: {even_count}")