import cProfile
from typing import List
from memory_profiler import profile

class Solution:
    @profile
    def minOperations(self, logs: List[str]) -> int:
        current_depth = 0
        for log in logs:
            if log == '../':
                if current_depth > 0:
                    current_depth -= 1
            elif log == './':
                continue
            else:
                current_depth += 1

        return current_depth

# test case
logs = ["d1/","d2/","../","d21/","./"]
minOp = Solution()

print(f"Current depth: {minOp.minOperations(logs)}")
cProfile.run('minOp.minOperations(logs)')