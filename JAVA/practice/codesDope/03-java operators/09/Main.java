/*
 * If the marks of Robert in three subjects are 78,45 and 62 
 * respectively (each out of 100 ), write a program to calculate 
 * his total marks and percentage marks.
*/

public class Main {
    public static void main(String[] args) {
        double percentage_marks;
        int mark1 = 78, mark2 = 45, mark3 = 62, total_marks;
        total_marks = mark1 + mark2 + mark3;
        percentage_marks = ((double) total_marks / 300) * 100;
        System.out.println("Total marks of Robert: "+total_marks+"\n");
        System.out.println("Percentage marks of Robert: "+percentage_marks);
    }
}
