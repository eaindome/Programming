import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        // switch
        /* Syntax
         *     switch(expression) {
         *         case x:
         *             // code block
         *             break;
         *         case y:
         *             // code block
         *             break;
         *         default:
         *             // code block
         *     }
        */
        System.out.println("SWITCH: ");
        System.out.println("Enter a number between 1 and 7: ");
        Scanner scanner = new Scanner(System.in);
        switch (scanner.nextInt()) {
            case 1:
                System.out.println("Monday");
                break; // without break, it will continue to the next case
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break; 
            case 4:
                System.out.println("Thursday");
                break;
            case 5:
                System.out.println("Friday");
                break;
            case 6:
                System.out.println("Saturday");
            case 7:
                System.out.println("Sunday");
                break;
            default:
                System.out.println("Looking forward to the Weekend");
        }
        scanner.close();    // close the scanner
    }
}


/*
 * cd path/to/your/java/file
    javac Main.java
    java Main
 */