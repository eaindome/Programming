/*
 * Suppose the values of variables 'a' and 'b' are 6 and 8 respecrtively, 
 * write two programs to swap the values of the two variables.
    1 - first program by using a third variable
    2 - second program without using any third variable
    ( Swapping means interchanging the values of the two variables 
    E.g.- If entered value of x is 5 and y is 10 then after swapping 
    the value of x and y should become 10 and 5 respectively.) 
*/

public class Main {
    public static void main(String[] args) {
        System.out.println("Using a third variable temp: ");
        int a = 6, b = 8, temp = 0;
        System.out.println("a: "+a+"\n"+"b: "+b+"\n"+"temp: "+temp);
        temp = a;
        a = b;
        b = temp;
        System.out.println("After swapping: ");
        System.out.println("a: "+a+"\n"+"b: "+b+"\n"+"temp: "+temp+"\n");

        System.out.println("Without using a third variable: ");
        b = a;
        a = temp;
        System.out.println("a: "+a+"\n"+"b: "+b);
        b = b-a;
        a = b+a;
        b = -(b-a);
        System.out.println("After swapping: ");
        System.out.println("a: "+a+"\n"+"b: "+b+"\n");

    }
}
