public class Main {
    public static void main(String[] args) {
        // Recursion
        /*
         * Recursion is the technique of making a function call itself. 
         * This technique provides a way to break complicated problems down 
         * into simple problems which are easier to solve.
         * 
         * Recursion is a common mathematical and programming concept. 
         * It means that a function calls itself. 
         * This has the benefit of meaning that you can loop through data 
         * to reach a result.
         * 
         * The developer should be very careful with recursion as it can be 
         * quite easy to slip into writing a function which never terminates, 
         * or one that uses excess amounts of memory or processor power. 
         * However, when written correctly recursion can be a very efficient 
         * and mathematically-elegant approach to programming.
         * 
         * In this example, tri_recursion() is a recursive function. 
         * It finds the factorial of a number. 
         * n! = n × (n−1)!
         * 
         * During the execution of the program, when the function call itself, 
         * it is known as recursion.
         * 
         * Note: Recursion can be slow, because each time the function is called, 
         * the program must save the current state of the function and 
         * then resume execution at the same point it was left off.
         * 
         * Note: In the example below, we use recursion to sum a sequence of numbers.
        */
        System.out.println("Recursion: ");
        int result = sum(10);
        System.out.println("result: " + result + "\n");

        // another recursion example with halting
        int result2 = addition(5, 10);
        System.out.println("result2: " + result2 + "\n");
    }

    public static int sum(int k) {
        if (k > 0) {
            return k + sum(k-1);
        } else {
            return 0;
        }
    }

    public static int addition(int start, int end){
        if (end > start) {
            return end + addition(start, end -1);
        } else {
            return end;
        }
    }
}
