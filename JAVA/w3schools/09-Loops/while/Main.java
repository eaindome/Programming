public class Main {
    public static void main(String[] args) {
        // while loop
        /* Syntax
         *     while (condition) {
         *         // code block to be executed
         *     }
        */
        System.out.println("WHILE LOOP: ");
        int i = 0;
        while (i < 5) {
            System.out.println("i: " + i);
            i++;
        }

        // do while loop
        /* Syntax
         *     do {
         *         // code block to be executed
         *     }
         *     while (condition);
        */
        System.out.println("\nDO-WHILE LOOP: ");
        i = 0;
        do {
            System.out.println("i: " + i);
            i++;
        }
        while (i < 5);
    }
}
