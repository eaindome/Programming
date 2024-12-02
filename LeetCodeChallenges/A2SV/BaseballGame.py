class Solution(object):
    def calPoints(self, operations):
        """
        :type operations: List[str]
        :rtype: int
        """
        score = []
        for op in operations:
            if op == 'C':
                score.pop()
            elif op == 'D':
                score.append(score[-1]*2)
            elif op == '+':
                score.append(score[-1] + score[-2])
            else:
                score.append(int(op))

        return sum(score)