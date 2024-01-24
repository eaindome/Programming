/*
 * Now, solve the above question using assignment operators 
 * (eg. +=, -=, *=).
*/

public class Main {
    public static void main(String[] args) {
        System.out.println("Question 1: ");
        int length = 5, breadth = 7, area = 0, perimeter1 = 0;
        area += length;
        area *= breadth;
        perimeter1 += length + breadth;
        perimeter1 += perimeter1;
        System.out.println("Area of rectangle: " + area);
        System.out.println("Perimeter of rectangle: " + perimeter1 + "\n");

        System.out.println("Question 2: ");
        int side1 = 2, side2 = 3, side3 = 5, perimeter2=0;
        perimeter2 += side1 + side2 + side3;
        System.out.println("Perimeter of triangle: " + perimeter2 + "\n");

        System.out.println("Question 3: ");
        int num = 2345;
        num += 8;
        num /= 3;
        num %= 5;
        num *= 5;
        System.out.println("Solution to Q3: " + num);
    }
}
