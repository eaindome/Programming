/*
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
*/
#include <iostream>
#include <vector>
using namespace std;

// define class for Matrix operations
class Matrix {
private:
    int rows, columns;
    vector< vector<int> > matrix;

public:
    // constructor to initialize the Matrix with the given number of rows and columns
    Matrix(int row, int column):
    rows(row), columns(column) {
        // initialize the matrix with all zeros
        matrix = vector< vector<int> >(row, vector<int>(column, 0));
    }

    // get the number of rows in the Matrix
    int getNumRows() { return rows; }

    // get the number of columns in the Matrix
    int getNumColumns() { return columns; }

    // set the value of an element at a specific position (i, j) in the Matrix
    void setMatrix(int i, int j, int value) {
        // check if the position is within the valid range
        if (i >= 0 && i < rows && j >= 0 && j < columns) {
            matrix[i][j] = value;
        }
    }

    // add another Matrix to the current Matrix
    void addMatrixes(Matrix& other) {
        if (rows != other.getNumRows() || columns != other.getNumColumns()) {
            cout << "Matrix dimensions do not match for addition." << endl;
            return;
        }

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                matrix[i][j] += other.matrix[i][j];
            }
        }
    }

    // multiply the current Matrix by another Matrix
    void multiplyMatrixes(Matrix& other) {
        if (columns != other.getNumRows()) {
            cout << "Matrix dimensions do not match for multiplication." << endl;
            return;
        }

        // create a result matrix for the multiplication
        vector< vector<int> > result(rows, vector<int>(other.getNumColumns(), 0));

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < other.getNumColumns(); j++) {
                for (int k = 0; k < columns; k++) {
                    result[i][j] += matrix[i][k] * other.matrix[k][j];
                }
            }
        }

        // update the current matrix with the result
        matrix = result;
        columns = other.getNumColumns();
    }

    // display the elements of the Matrix
    void displayMatrix() {
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                cout << matrix[i][j] << " ";
            }
            cout << endl;
        }
    }
};

int main() {
    // create two Matrices
    Matrix mat1(2, 3);
    Matrix mat2(3, 2);

    // set elements of Matrix 1
    mat1.setMatrix(0, 0, 1);
    mat1.setMatrix(0, 1, 2);
    mat1.setMatrix(0, 2, 3);
    mat1.setMatrix(1, 0, 4);
    mat1.setMatrix(1, 1, 5);
    mat1.setMatrix(1, 2, 6);

    // set elements of Matrix 2
    mat2.setMatrix(0, 0, 7);
    mat2.setMatrix(0, 1, 8);
    mat2.setMatrix(1, 0, 9);
    mat2.setMatrix(1, 1, 10);
    mat2.setMatrix(2, 0, 11);
    mat2.setMatrix(2, 1, 12);

    // display the Matrices
    cout << "Matrix 1:" << endl;
    mat1.displayMatrix();
    cout << "Matrix 2:" << endl;
    mat2.displayMatrix();

    // multiply Matrix 1 by Matrix 2
    mat1.multiplyMatrixes(mat2);
    cout << "Matrix 1 after multiplication:" << endl;
    mat1.displayMatrix();

    return 0;
}
