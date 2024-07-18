import java.util.*;

public class shft {
    public static void main(String[] args) {
        int a[] = {1, 2, 3, 4, 5};
        int t = a[4];
        for(int i = 4; i > 0; i--) {
            a[i] = a[i-1];
        }
        System.out.println(Arrays.toString(a));
        a[0] = t;
        System.out.println();
        System.out.println(Arrays.toString(a));
        System.out.println();
        for(int i = 0; i<=4; i++) {
            System.out.print(a[i]);
        }
    }
}
