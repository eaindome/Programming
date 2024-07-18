from typing import List

class Solution:
    def getMaximumGold(self, grid: List[List[int]]) -> int:
        def backtrack(row, col, visited):
            if row < 0 or row >= len(grid) or col < 0 or col >= len(grid[0]) or grid[row][col] == 0 or visited[row][col]:
                return 0
            
            visited[row][col] = True
            gold_collected = grid[row][col]
            
            max_gold = 0
            for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                max_gold = max(max_gold, backtrack(row + dr, col + dc, visited))
            
            visited[row][col] = False
            return gold_collected + max_gold
        
        max_gold = 0
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] != 0:
                    visited = [[False]*len(grid[0]) for _ in range(len(grid))]
                    max_gold = max(max_gold, backtrack(i, j, visited))
        
        return max_gold
    
