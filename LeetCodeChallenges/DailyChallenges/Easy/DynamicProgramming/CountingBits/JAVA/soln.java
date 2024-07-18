package DynamicProgramming.CountingBits.JAVA;

public class soln {
    public int[] countBits(int n) {
        int[] ans = new int[n+1];

        for(int i=1; i<=n; i++) {
            ans[i] = ans[i>>1] + (i&1);
        }
        return ans;
    }

    public static void main(String[] args) {
        soln s = new soln();
        int n = 5;
        int[] ans = s.countBits(n);
        for(int i=0; i<ans.length; i++) {
            System.out.print(ans[i] + " ");
        }
    }
}
