public class Main {
    public static void main(String[] args) {
        // break
        /* Syntax
         *     break;
        */
        System.out.println("BREAK: ");
        for (int i = 0; i < 10; i++) {
            if (i == 4) {
                break;
            }
            System.out.println("i: " + i);
        }

        // continue
        /* Syntax
         *     continue;
        */
        System.out.println("\nCONTINUE: ");
        for (int i = 0; i < 10; i++) {
            if (i == 4) {
                continue;
            }
            System.out.println("i: " + i);
        }

        // break and continue in while loop
        // break
        System.out.println("\nBREAK IN WHILE LOOP: ");
        int m = 0;
        while (m < 10) {
            System.out.println("m: " + m);
            m++;
            if (m == 4) {
                break;
            }
        }

        // continue
        System.out.println("\nCONTINUE IN WHILE LOOP: ");
        int n = 0;
        while (n < 10) {
            if (n == 4) {
                n++;
                continue;
            }
            System.out.println("n: " + n);
            n++;
        }
    }
}
