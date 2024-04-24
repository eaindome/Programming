/*
 * The total number of students in a class are 90 out of which 
 * 45 are boys. If 50% of the total students secured grade 'A' out of 
 * which 20 are boys, then write a program to calculate the total 
 * number of girls getting grade 'A'.
*/
public class Main {
    public static void main(String[] args) {
        double boys = 20.0, girls;
        double grade_A = (50.0 / 100.0) * 90;
        System.out.println("Grade A students: " + grade_A);
        girls = grade_A - boys;
        System.out.println("Number of Grade A girls: " + ((int) girls));
    }
}
