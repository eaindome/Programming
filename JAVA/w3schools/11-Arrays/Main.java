public class Main {
    public static void main(String[] args) {
        // arrays
        /* Syntax
         *     type[] arrayName = {value1, value2, value3, ...};
         *     type[] arrayName = new type[size];
         *     arrayName[index];
        */
        System.out.println("ARRAYS: ");
        String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
        System.out.println("cars[0]: " + cars[0]);

        // change an array element
        cars[0] = "Opel";
        System.out.println("cars[0]: " + cars[0]);

        // array length
        System.out.println("Length of cars array: "+cars.length);

        // loop through an array
        System.out.println("\nLoop through an array \nFOR LOOP:");
        for (int i = 0; i < cars.length; i++) {
            System.out.println("car "+i+": "+cars[i]);
        }

        // for-each loop    
        System.out.println("\nFOR-EACH LOOP:");
        for (String i : cars) {
            System.out.println("car: "+i);
        }

        // multi-dimensional arrays
        /* Syntax
         *     type[][] arrayName = { {val1, val2, val3, ...}, {val1, val2, val3, ...}, ... };
         *     type[][] arrayName = new type[size1][size2];
         *     arrayName[index1][index2];
        */
        System.out.println("\nMULTI-DIMENSIONAL ARRAYS:");
        int[][] myNumbers = {
            {1, 2, 3, 4},
            {5, 6, 7}
        };
        System.out.println("Accessed element: " + myNumbers[1][2]);
        int a = myNumbers[1][2];

        // change an array element
        myNumbers[1][2] = 8;
        System.out.println("Changed "+a+" to "+myNumbers[1][2]);

        // loop through a multi-dimensional array
        System.out.println("\nLoop through a multi-dimensional array \nFOR LOOP:");
        for (int m = 0; m < myNumbers.length; m++) {
            for (int n = 0; n < myNumbers[m].length; n++) {
                System.out.println(myNumbers[m][n]);
            }
        }
    }
}
