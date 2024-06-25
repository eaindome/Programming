from typing import List

class Solution:
    def minOperations(self, logs: List[str]) -> int:
        stack = []

        for l in logs:
            if l == './':
                continue
            elif l == '../':
                if len(stack) > 0:
                    stack.pop()
            else:
                stack.append(l)
        return len(stack)