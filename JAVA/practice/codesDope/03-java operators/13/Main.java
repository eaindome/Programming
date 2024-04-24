/*
 * Write a program to calculate the sum of the first and 
 * the second last digit of a 5 digit.
    E.g.- NUMBER : 12345        OUTPUT : 1+4=5
*/
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {        
        int num, num1, first, second, third, fourth, fifth, sum;

        System.out.println("First Method (Using place values): ");
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter a 5-digit number: ");
        num = scanner.nextInt();
        num1 = num;

        if (num >= 10000 && num <= 99999) {
            first = num/10000;      // first digit
            num = num%10000;

            second = num/1000;      // second digit
            num = num%1000;

            third = num/100;        // third digit
            num = num%100;

            fourth = num/10;        // fourth digit
            fifth = num%10;         // fifth digit

            sum = first + fourth;
            System.out.println("The sum of the first and last digit of "+num1+" is: "+sum);
        } else {
            System.out.println("Please enter a valid 5-digit number.");
        }

        System.out.println("\n");
        System.out.println("Second Method (Converting to String): ");

        // check if the input is a 5-digit number
        if (num1 >= 10000 && num1 <= 99999) {
            int result = calculateSumOfDigits(num1);
            System.out.println("Sum of the first and second last digit: " + result);
            System.out.println("\n");
        } else {
            System.out.println("Please enter a valid 5-digit number.");
            System.out.println("\n");
        }

        // close the scanner
        scanner.close();
    }

    // function to calculate the sum of the first and second last digit
    private static int calculateSumOfDigits(int number) {
        String numStr = Integer.toString(number);

        // Extract the first and second last digits
        int firstDigit = Character.getNumericValue(numStr.charAt(0));
        int secondLastDigit = Character.getNumericValue(numStr.charAt(numStr.length() - 2));

        // calculate the sum
        return firstDigit + secondLastDigit;
    }
}
