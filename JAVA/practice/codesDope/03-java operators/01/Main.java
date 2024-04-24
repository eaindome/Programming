/*
 * Length and breadth of a rectangle are 5 and 7 respectively. 
 * Write a program to calculate the area and perimeter of the rectangle.
 */

public class Main {
    public static void main(String[] args) {
        int length = 5;
        int breadth = 7;
        double area = length * breadth;
        double perimeter = (2 * length) + (2 * breadth);
        System.out.println("Area of rectangle: "+area);
        System.out.println("Perimeter of rectangle: "+perimeter);
    }
}
