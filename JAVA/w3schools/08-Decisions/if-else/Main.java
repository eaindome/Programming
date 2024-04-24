public class Main {
    public static void main(String[] args) {
        // if
        /* Syntax
         *     if (condition) {
         *        // block of code to be executed if the condition is true
        */
        System.out.println("IF-ELSE: ");
        if (20 > 18) {
            System.out.println("20 is greater than 18");
        }

        int x = 20;
        int y = 18;
        if (x > y) {
            System.out.println("x is greater than y");
        }

        // else
        /* Syntax
         *     if (condition) {
         *        // block of code to be executed if the condition is true
         *     } else {
         *        // block of code to be executed if the condition is false
         *     }
        */
        int time = 20;
        if (time < 18) {
            System.out.println("Good day.");
        } else {
            System.out.println("Good evening.");
        }

        // else if
        /* Syntax
         *     if (condition1) {
         *        // block of code to be executed if condition1 is true
         *     } else if (condition2) {
         *        // block of code to be executed if the condition1 is false and condition2 is true
         *     } else {
         *        // block of code to be executed if the condition1 is false and condition2 is false
         *     }
        */
        time = 22;
        if (time < 10) {
            System.out.println("Time: "+ time +"; Good morning." + "\n");
        } else if (time < 18) {
            System.out.println("Time: "+ time +"; Good day." + "\n");
        } else {
            System.out.println("Time: "+ time +"; Good evening." + "\n");
        }

        // short hand if...else (ternary operator)
        /* Syntax
         *     variable = (condition) ? expressionTrue :  expressionFalse;
        */
        String result = (time < 18) ? "Good day." : "Good evening.";
        System.out.println("Time: "+ time +"; " + result + "\n");
    }
}
