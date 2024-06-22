# Initialize a 2D list (matrix)
matrix = [[1, 2, 3], [4, 5, 6], [9, 8, 9]]

# Initialize two empty lists to store the elements of the main diagonal and the reverse diagonal
diagonal = []
reverse_diagonal = []

# Iterate over the indices of the matrix
for i in range(len(matrix)):
    # Append the element at row i, column i to the main diagonal list
    diagonal.append(matrix[i][i])
    
    # Append the element at row i, column len(matrix)-1-i to the reverse diagonal list
    reverse_diagonal.append(matrix[i][len(matrix)-1-i])

# Calculate the sum of the elements in the main diagonal and the reverse diagonal
sum_diagonal = sum(diagonal)
sum_reverse_diagonal = sum(reverse_diagonal)

# Calculate the absolute difference between the sum of the main diagonal and the sum of the reverse diagonal
abs_diff = abs(sum_diagonal - sum_reverse_diagonal)

# Print the elements of the main diagonal, the reverse diagonal, and the absolute difference between their sums
print(f"Diagonal: {diagonal}\n"
      f"Reverse Diagonal: {reverse_diagonal}\n"
      f"Absolute Sum Difference: {abs_diff}")