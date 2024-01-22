public class Main {
    static void myMethod() {
        System.out.println("I just got executed!");
    }
    public static void main(String[] args) {
        /*
         * A method is a block of code which only runs when it is called.   
         * You can pass data, known as parameters, into a method.
         * Methods are used to perform certain actions, and they are also known as functions.
         * 
         * Syntax
         * A method must be declared within a class. 
         * It is defined with the name of the method, followed by parentheses (). 
         * Java provides some pre-defined methods, such as System.out.println(), 
         * but you can also create your own methods to perform certain actions:
         * Example: Create a method inside Main class:
         *    static void myMethod() {
         *       // code to be executed
         *   }
         * 
         * Call a Method
         * To call a method in Java, write the method's name followed by two parentheses () and a semicolon;
         * Example: Call a Method
         *   public class Main {
         *      static void myMethod() {
         *         System.out.println("I just got executed!");
         *     }
         *
        */
        myMethod();
    }
}
