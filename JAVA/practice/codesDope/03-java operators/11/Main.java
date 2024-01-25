/*
 * Write a program to convert Fahrenheit into Celsius.
*/
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("Fahrenheit to Celsius converter: ");
        System.out.println("Enter temperature in Fahrenheit: ");
        Scanner scanner = new Scanner(System.in);
        double fahrenheit = scanner.nextDouble();
        double celsius = (5.0/9.0) * (fahrenheit-32);
        System.out.println("Temperature in Celsius: " + celsius);

        // close the scanner
        scanner.close();
    }
}
