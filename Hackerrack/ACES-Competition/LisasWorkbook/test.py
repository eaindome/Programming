def workbook(n, k, arr):
    special_problems = 0
    current_page = 1
    
    for chapter in range(n):
        num_problems = arr[chapter]
        problems_on_current_page = 0
        
        for problem in range(1, num_problems + 1):
            if problems_on_current_page == k:
                current_page += 1
                problems_on_current_page = 0
            
            problems_on_current_page += 1
            
            if problem == current_page:
                special_problems += 1
        
        current_page += 1 if problems_on_current_page > 0 else 0
    
    return special_problems

# Example usage:
n = 2
k = 3
arr = [4, 2]
print(workbook(n, k, arr))  # Output should be 1
