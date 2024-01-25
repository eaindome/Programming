/*
 * Take a 4 digit number. 
 * Write a program to display a number whose digits are 2 
 * greater than the corresponding digits of the number TAKEN.
    For example, if the number which was taken is 5696, then 
    the displayed number should be 7818.
*/
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int num;

        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter a 4-digit number: ");
        num = scanner.nextInt();

        String numStr = Integer.toString(num);
        StringBuilder result = new StringBuilder();

        for (char digitChar : numStr.toCharArray()) {
            int digit = Character.getNumericValue(digitChar);
            digit = (digit + 2) % 10; // add 2 to the digit, wrap around if it's greater than 9
            result.append(digit);
        }

        System.out.println("The transformed number is: " + result.toString());

        // close the scanner
        scanner.close();
    }
}
