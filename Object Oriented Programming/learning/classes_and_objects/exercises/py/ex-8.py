"""
Print the average of three numbers entered by the user 
by creating a class named 'Average' having a function to calculate 
and print the average without creating any object of the Average class.
"""

class Average:
    # using static method decorator 
    @staticmethod
    def getAverage(num1, num2, num3):
        print(f"Average: {(num1+num2+num3)/3.0}")

if __name__ == "__main__":
    Average.getAverage(3, 5, 4)
