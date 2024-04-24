//package 05-String;

public class Main {
    public static void main(String[] args) {
        // Java strings
        System.out.println("STRINGS: ");

        String greeting = "Hello";
        String txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        // string length
        System.out.println("The length of the txt string is: " + txt.length());
        System.out.println("The lenght of the greeting string is: " + greeting.length());

        // string methods
        System.out.println("txt string in upper case: " + txt.toUpperCase());
        System.out.println("greeting string in lower case: " + greeting.toLowerCase());
        
        // finding a character in a string
        String text = "Please locate where 'locate' occurs!";
        System.out.println("Location of 'locate' in text: "+text.indexOf("locate") + "\n");

        // string concatenation
        String firstName = "John";
        String lastName = "Doe";
        System.out.println(firstName + " " + lastName);  // using the + operator
        System.out.println(firstName.concat(lastName));        // using the concat() method

        // numbers and strings
        /* WARNING!
            Java uses the + operator for both addition and concatenation.
            Numbers are added. Strings are concatenated.
        */
        // adding two numbers, will return the sum, 30
        int x = 10;
        int y = 20;
        int z = x + y;      // z will be 30 (an integer/number)
        System.out.println("z = " + z + "; z is an integer/number");
        
        // adding two strings, will return a string concatenation, 1020
        String s = "10";
        String t = "20";
        String u = s + t;   // u will be 1020 (a String)
        System.out.println("u = " + u + "; u is a string");

        // adding a number and a string, will return a string concatenation, 1020
        String m = "10";
        int n = 20;
        String o = m + n;   // o will be 1020 (a String)
        System.out.println("o = " + o + "; o is a string" + "\n");

        // special characters
        /*
         * Escape character      Result     Description
         * \'                    '          Single quote
         * \"                    "          Double quote
         * \\                    \          Backslash
        */
        String state = "We are the so-called \"Vikings\" from the north.";
        System.out.println(state);

        String txt2 = "It\'s alright.";
        System.out.println(txt2);

        String txt3 = "The character \\ is called backslash.";
        System.out.println(txt3);

        // other escape characters
        /*
         * Code      Result
         * \n        New Line
         * \r        Carriage Return
         * \t        Tab
         * \b        Backspace
         * \f        Form Feed
        */
    }
}
