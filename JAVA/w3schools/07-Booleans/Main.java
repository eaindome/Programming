public class Main {
    public static void main(String[] args) {
        // booleans
        System.out.println("BOOLEANS: ");
        boolean isJavaFun = true;
        boolean isFishTasty = false;
        System.out.println("Is Java fun? " + isJavaFun);
        System.out.println("Is fish tasty? " + isFishTasty + "\n");

        // boolean expressions
        int x = 10;
        int y = 9;
        System.out.println("x = " + x + "; y = " + y);
        System.out.println("x > y is " + (x > y)); // returns true, because 10 is higher than 9
        System.out.println(10 > 9);

        System.out.println("Is x equal to 10: "+(x == 10));
        System.out.println("Is 10 == 15: "+(10 == 15)+"\n");

        // realife example
        int myAge = 30;
        int votingAge = 18;
        System.out.println("""
                My age is: """ + myAge + """
                \nVoting age is: """ + votingAge + """
                \nCan I vote? """ + (myAge >= votingAge) + """
                """);

        // another way of expressing the same thing
        System.out.println("""
                My age is: """ + myAge + """
                \nVoting age is: """ + votingAge + """
                \nCan I vote? """ + (myAge >= votingAge ? "Yes" : "No") + """
                """);

        // another way of expressing the same thing
        if (myAge >= votingAge) {
            System.out.println("Old enought to vote!");
        } else {
            System.out.println("Not old enough to vote!");
        }

    }
}
