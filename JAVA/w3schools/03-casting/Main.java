//package casting;

public class Main {
    public static void main(String[] args) {
        // type casting
        // widening casting
        System.out.println("TYPE CASTING: ");
        int myInt2 = 10;
        double myDouble = myInt2;       // automatic casting: int to double

        System.out.println("Widening casting: ");
        System.out.println("My integer: " + myInt2);
        System.out.println("My integer in decimals: " + myDouble);

        // narrowing casting
        double myDouble2 = 9.78d;
        int myInt3 = (int) myDouble2;   // manual casting: double to int

        System.out.println("Narrowing casting: ");
        System.out.println("My decimal number: " + myDouble2);
        System.out.println("My decimal in integer: " + myInt3);
        System.out.println();
    }
}
