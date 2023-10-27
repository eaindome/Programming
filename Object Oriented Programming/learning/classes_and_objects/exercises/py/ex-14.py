'''
Create a class called 'Matrix' containing constructor that initializes the number of rows and the number of columns of a new Matrix object. The Matrix class has the following information:
1 - number of rows of matrix
2 - number of columns of matrix
3 - elements of matrix (You can use 2D vector)
The Matrix class has functions for each of the following:
1 - get the number of rows
2 - get the number of columns
3 - set the elements of the matrix at a given position (i,j)
4 - adding two matrices.
5 - multiplying the two matrices
You can assume that the dimensions are correct for the multiplication and addition.
'''

class Matrix:
    def __init__(self, rows, columns):
        """
        Constructor to initialize the Matrix with the given number of rows and columns.
        Args:
            rows (int): Number of rows in the Matrix.
            columns (int): Number of columns in the Matrix.
        """
        self.__rows = rows
        self.__columns = columns
        self.matrix = [[0] * columns for _ in range(rows)]

    def getNumRows(self):
        """
        Get the number of rows in the Matrix.
        Returns:
            int: Number of rows.
        """
        return self.__rows

    def getNumColumns(self):
        """
        Get the number of columns in the Matrix.
        Returns:
            int: Number of columns.
        """
        return self.__columns
    
    def setMatrix(self, i, j, value):
        """
        Set the value of an element at a specific position (i, j) in the Matrix.
        Args:
            i (int): Row index.
            j (int): Column index.
            value: Value to be set at the position (i, j).
        """
        if 0 <= i < self.__rows and 0 <= j < self.__columns:
            self.matrix[i][j] = value

    def addMatrices(self, other):
        """
        Add another Matrix to the current Matrix.
        Args:
            other (Matrix): The Matrix to be added to the current Matrix.
        """
        if self.__rows != other.getNumRows() or self.__columns != other.getNumColumns():
            print("Matrix dimensions do not match for addition.")
            return
        
        for i in range(self.__rows):
            for j in range(self.__columns):
                self.matrix[i][j] += other.matrix[i][j]

    def multiplyMatrices(self, other):
        """
        Multiply the current Matrix by another Matrix.
        Args:
            other (Matrix): The Matrix to be multiplied with the current Matrix.
        """
        if self.__columns != other.getNumColumns():
            print("Matrix dimensions do not match for multiplications.")
            return

        result = [[0] * other.getNumColumns() for _ in range(self.__rows)]

        for i in range(self.__rows):
            for j in range(other.getNumColumns()):
                for k in range(self.__columns):
                    result[i][j] += self.matrix[i][k] * other.matrix[k][j]

        self.matrix = result
        self.__columns = other.getNumColumns()

    def displayMatrix(self):
        """
        Display the elements of the Matrix.
        """
        for row in self.matrix:
            print(" ".join(map(str, row)))


mat1 = Matrix(2, 3)
mat2 = Matrix(3, 2)

mat1.setMatrix(0, 0, 1)
mat1.setMatrix(0, 1, 2)
mat1.setMatrix(0, 2, 3)
mat1.setMatrix(1, 0, 4)
mat1.setMatrix(1, 1, 5)
mat1.setMatrix(1, 2, 6)

mat2.setMatrix(0, 0, 7)
mat2.setMatrix(0, 1, 8)
mat2.setMatrix(1, 0, 9)
mat2.setMatrix(1, 1, 10)
mat2.setMatrix(2, 0, 11)
mat2.setMatrix(2, 1, 12)

print("Matrix 1:")
mat1.displayMatrix()
print("Matrix 2:")
mat2.displayMatrix()

mat1.multiplyMatrices(mat2)
print("Matrix 1 after multiplication:")
mat1.displayMatrix()


