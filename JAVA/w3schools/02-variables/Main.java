//package 02-variables;

public class Main {
    public static void main(String[] args) {
        // variables
        /* Syntax:
         *      type variableName = value;
        */
        System.out.println("VARIABLES: ");
        String name = "John";
        System.out.println("My name is: " + name);

        int myNum = 15;
        System.out.println("My number is: " + myNum);

        myNum = 20;
        System.out.println("My number is now: " + myNum);

        final int mynum = 15;
        System.out.println("My final number is: " + mynum + " and it cannot be changed.");

        String lastName = "Doe";
        String fullName = name + lastName;
        System.out.println("My full name is: " + fullName);
    }
}