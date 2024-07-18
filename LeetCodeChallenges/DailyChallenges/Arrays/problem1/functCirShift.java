import java.util.Scanner;

public class functCirShift {
    public static void main(String[] args) {
        // introduction
        System.out.println("This is a program to perform a circular shift left on an array of numbers");
        
        // array of numbers
        System.out.println("Enter the number of elements in your array: ");
        Scanner myShift = new Scanner(System.in);
        
        //taking the no of elements in the array
        int nA = myShift.nextInt();     
        int[] arr = new int[nA];

        // taking the elements of the array
        System.out.println("Enter the numbers you want to apply the shift to");
        for(int b = 0; b < nA; b++){
            arr[b] = myShift.nextInt();
        }

        System.out.println("Enter the number of shifts you would like to perform");
        int nS = myShift.nextInt();     //taking the number of shifts from the user

        // calling the function	
        System.out.println("The shifted array: ");
        int[] shiftedArr = CirShift(arr, nS);
        for (int num : shiftedArr) {
            System.out.print(num + " ");
        }
    }


}




