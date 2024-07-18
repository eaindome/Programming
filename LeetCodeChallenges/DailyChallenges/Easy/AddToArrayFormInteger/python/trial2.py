from typing import List

class Solution:
    def addToArrayForm(self, num: List[int], k: int) -> List[int]:
        for i in range(len(num)-1, -1, -1):
            num[i] += k
            k, num[i] = divmod(num[i], 10)
            if k == 0:
                break
        return [int(i) for i in str(k)] + num if k else num