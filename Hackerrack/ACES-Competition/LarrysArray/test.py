def larrysArray(A):
    def count_inversions(arr):
        inversions = 0
        n = len(arr)
        for i in range(n):
            for j in range(i + 1, n):
                if arr[i] > arr[j]:
                    inversions += 1
        return inversions
    
    inversions = count_inversions(A)
    return "YES" if inversions % 2 == 0 else "NO"

# Function to process multiple test cases
def process_test_cases(test_cases):
    results = []
    for A in test_cases:
        results.append(larrysArray(A))
    return results

# Example usage:
t = 2
test_cases = [
    [1, 6, 5, 2, 4, 3],
    [3, 1, 2]
]

results = process_test_cases(test_cases)
for result in results:
    print(result)
