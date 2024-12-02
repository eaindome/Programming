from typing import List
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        day_count = []
        temp_res = [0] * len(temperatures)

        # for i in range(len(temperatures)):
        #     while day_count and temperatures[i] > temperatures[day_count[-1]]:
        #         idx = day_count.pop()
        #         temp_res[idx] = i - idx
        #     day_count.append(i)

        # return temp_res

        for i, temp in enumerate(temperatures):
            while day_count and temperatures[day_count[-1]] < temp:
                index = day_count.pop()
                temp_res[index] = i - index
            day_count.append(i)

        return temp_res