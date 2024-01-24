/*
 * Now solve the above question to check if atleast 
 * one of the conditions 'a < 50' or 'a < b' is true.
*/
public class Main {
    public static void main(String[] args) {
        int a = 55, b = 70;
        System.out.println("Is a < 50 or a < b: " + ((a<50) || (a<b)));
    }
}
