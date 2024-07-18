from typing import List

class Solution:
    def getMaximumGold(self, grid: List[List[int]]) -> int:
        def backtrack(row, col):
            stack = [(row, col, 0)]  # Stack to perform iterative DFS
            max_gold = 0
            
            while stack:
                row, col, cur_gold = stack.pop()
                
                if row < 0 or row >= len(grid) or col < 0 or col >= len(grid[0]) or grid[row][col] == 0 or visited[row][col]:
                    continue
                
                cur_gold += grid[row][col]
                max_gold = max(max_gold, cur_gold)
                visited[row][col] = True
                
                for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                    stack.append((row + dr, col + dc, cur_gold))
            
                visited[row][col] = False
                
            return max_gold
        
        max_gold = 0
        visited = [[False] * len(grid[0]) for _ in range(len(grid))]
        
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] != 0:
                    max_gold = max(max_gold, backtrack(i, j))
        
        return max_gold

# Test cases
grid1 = [
    [0, 6, 0],
    [5, 8, 7],
    [0, 9, 0]
]
grid2 = [
    [1, 0, 7],
    [2, 0, 6],
    [3, 4, 5],
    [0, 3, 0],
    [9, 0, 20]
]

sol = Solution()
print(sol.getMaximumGold(grid1))  # Output: 24
print(sol.getMaximumGold(grid2))  # Output: 28
