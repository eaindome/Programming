public class Main {
    static void myMethod(String fname) {
        System.out.println(fname + " Refsnes.");
    }

    static void anotherMethod(String fname, int age) {
        System.out.println(fname + " is " + age + " years old.");
    }

    static int additionBy5(int x) {
        return x + 5;
    }

    static int addition(int x, int y) {
        return x + y;
    }

    static void checkAge(int age) {
        if (age < 18) {
            System.out.println("Access denied - You are not old enough!");
        } else {
            System.out.println("Access granted - You are old enough!");
        }
    }

    public static void main(String[] args) {
        /*
         * Parameters and Arguments
         * Information can be passed to methods as parameter.
         * Parameters act as variables inside the method.
         * Parameters are specified after the method name, inside the parentheses.
         * You can add as many parameters as you want, just separate them with a comma.
         * The following example has a method that takes a String called fname as parameter.
         * When the method is called, we pass along a first name, which is used inside the method to print the full name:
         * 
        */
        // first method
        myMethod("Liam");
        myMethod("Morj");
        myMethod("Melon Tee");
        System.out.println();

        // second method
        anotherMethod("Liam", 5);
        anotherMethod("Morj", 8);
        anotherMethod("Melon Tee", 31);
        System.out.println();

        // Return Values
        /*
         * The void keyword, used in the examples above, indicates that the method should not return a value.
         * If you want the method to return a value, you can use a primitive data type (such as int, char, etc.) instead of void, and use the return keyword inside the method:
         * 
        */
        // add 3 to 5
        System.out.println("Adding 3 to 5: " + additionBy5(3));

        // addition
        System.out.println("Addition of 4 and 6: " + addition(4, 6));

        int z = addition(2, 8);
        System.out.println("Addition of 2 and 8: " + z);

        // A method with if...else
        int age = 20;
        checkAge(age);
    }
}
