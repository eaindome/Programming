public class Main {
    public static void main(String[] args) {
        /* Learning Java programming */
        // this is a comment
        System.out.println("INTRODUCTION: ");
        System.out.println("Hello World!");
        System.out.println("I am learning Java.");
        System.out.print("It is awesome! ");
        System.out.print("I will print on the same line");

        // print out some numbers
        System.out.println("Printing out some lines: ");
        System.out.println(3);
        System.out.println(3.14159);
        System.out.println(358);

        // print out some calculations
        System.out.println("Performing some calculations: ");
        System.out.println(5 + 3);
        System.out.println(5 - 3);
        System.out.println(5 * 3);
        System.out.println(5 / 3);
        System.out.println();


        // operators
        System.out.println("OPERATORS: ");

        // arithmetic operators
        // addition
        int m = 100 + 50;
        System.out.println("Addition in m: " + m);

        // adding variables, a variable and a value
        int sum1 = 125 + 50;
        int sum2 = sum1 + 250;
        int sum3 = sum2 + sum2;
        System.out.println("Addition of values: " + sum1);
        System.out.println("Addition of variables and values: " + sum2);
        System.out.println("Addition of variables: " + sum3);
        System.out.println();

        // arithmetic operators
        System.out.println("""
                Arithmetic operators include:
                +  <---> Addition       <---> Adds together two values                <---> x + y
                -  <---> Subtraction    <---> Subtracts one value from another        <---> x - y
                *  <---> Multiplication <---> Multiplies two values                   <---> x * y
                /  <---> Division       <---> Divides one value by another            <---> x / y
                %  <---> Modulus        <---> Returns the division remainder          <---> x % y
                ++ <---> Increment      <---> Increases the value of a variable by 1  <---> ++x
                -- <---> Decrement      <---> Decreases the value of a variable by 1  <---> --x
                """);
        System.out.println();

        // comparison operators
        System.out.println("""
                Comparison operators include:
                == <---> Equal to                 <---> x == y
                != <---> Not equal                <---> x != y
                >  <---> Greater than             <---> x > y
                <  <---> Less than                <---> x < y
                >= <---> Greater than or equal to <---> x >= y
                <= <---> Less than or equal to    <---> x <= y 
                """);
        System.out.println();

        // logical operators
        System.out.println("""
                Logical operators include:
                && <---> Logical and <---> Returns true if both statements are true                <---> x<5 && x<10
                || <---> Logical or  <---> Returns true if one of the statements is true           <---> x<5 || x<4
                !  <---> Logical not <---> Reverse the result, returns false if the result is true <---> !(x<5 && x<10)
                """);
        System.out.println();

    }
}