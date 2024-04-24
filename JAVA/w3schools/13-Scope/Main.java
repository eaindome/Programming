public class Main {
    public static void main(String[] args) {
        // Scope
        /*
         * In Java, variables are only accessible inside the region they are created. 
         * This is called scope.
        */
        // method scope
        System.out.println("Method Scope: ");
            // cannot use x here
        int x = 100;
            // can use x here
        System.out.println(x);

        // block scope
        /*
         * Code blocks are used to group statements.
         * In Java, the code block is used to define a block of code.
         * The block of code is executed if the condition is true.
         * A block of code refers to all of the code between curly braces {}
         */
        System.out.println("Block Scope: ");
            // code here cannot use x
        {       // this is a block
            // cannot use y here
            int y = 200;
            // can use y here
            System.out.println(y);
        }       // the block ends here
            // cannot use y here
        
        /*
         * A block of code may exist on its own or it can belong to an if, 
         * while or for statement. In the case of for statements, variables 
         * declared in the statement itself are also available inside 
         * the block's scope.
         */
    }
}
