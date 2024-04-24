public class Main {
    /*
    static int plusMethodInt(int x, int y) {
        return x + y;
    }

    static double plusMethodDouble(double x, double y) {
        return x + y;
    }
    */
    static int plusMethod(int x, int y) {
        return x + y;
    }

    static double plusMethod(double x, double y) {
        return x + y;
    }
    public static void main(String[] args) {
        // Method Overloading
        /*
         * With method overloading, multiple methods can have the same name with different parameters:
         * Example
         *     int myMethod(int x)
         *     float myMethod(float x)
         *     double myMethod(double x, double y)
         * 
         * Note: Multiple methods can have the same name as long as the number and/or type of parameters are different.
         * 
         * Note: Multiple methods can have the same name as long as the number and/or type of parameters are different.
         * 
         *Note: It is also possible to overload the main() method in Java. 
         * The main() method accepts a single argument: an array of elements of type String.
         * 
         * Example
         *     public static void main(String[] args) {
         *         System.out.println("Hello World!");
        */
        // int myNum1 = plusMethodInt(8, 5);
        // double myNum2 = plusMethodDouble(4.3, 6.26);

        int myNum1 = plusMethod(8, 5);
        double myNum2 = plusMethod(4.3, 6.26);
        System.out.println("int: " + myNum1);
        System.out.println("double: " + myNum2);
    }
}
