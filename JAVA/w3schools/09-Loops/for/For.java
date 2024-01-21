public class For {
    public static void main(String[] args) {
        // for loop
        /* Syntax
         *     for (statement 1; statement 2; statement 3) {
         *         // code block to be executed
         *     }
         * Statement 1 is executed (one time) before the execution of the code block.
         * Statement 2 defines the condition for executing the code block.
         * Statement 3 is executed (every time) after the code block has been executed.
        */
        System.out.println("FOR LOOP: ");
        for (int i = 0; i < 5; i++) {
            System.out.println("i: " + i);
        }
        System.out.println("\n");

        for (int j = 0; j <= 10; j = j + 2) {
            System.out.println("j: " + j);
        }
        System.out.println("\n");
        
        // inner loop and outer loop
        for (int m = 1; m <=2; m++) {
            System.out.println("Outer loop m: " + m);
            for (int n = 1; n <= 3; n++) {
                System.out.println("Inner loop n: " + n);
            }
        }

        // for-each loop
        /* Syntax
         *     for (type variableName : arrayName) {
         *         // code block to be executed
         *     }
        */
        System.out.println("\nFOR-EACH LOOP: ");
        String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
        for (String i : cars) {
            System.out.println(i);
        }
    }
}
