public class Main {
    public static void main(String[] args) {
        // Math
        System.out.println("MATH: ");
        /*
         * Math is a built-in object that has properties and methods for mathematical
         * constants and functions.
         * Math.max(a, b) returns the largest of a and b
         * Math.min(a, b) returns the smallest of a and b
         * Math.sqrt(x) returns the square root of x
         * Math.abs(x) returns the absolute (positive) value of x
         * Math.random() returns a random number between 0 (inclusive), and 1 (exclusive)
         * Math.round(x) returns the value of x rounded to its nearest integer
         * Math.ceil(x) returns the value of x rounded up to its nearest integer
         * Math.floor(x) returns the value of x rounded down to its nearest integer
         * Math.PI returns PI
         * Math.E returns Euler's number
         * Math.sin(x) returns the sine (a value between -1 and 1) of the angle x
         * Math.cos(x) returns the cosine (a value between -1 and 1) of the angle x
         * Math.tan(x) returns the tangent (a value between -1 and 1) of the angle x
         * Math.asin(x) returns the arc sine of an angle x (in radians)
         * Math.acos(x) returns the arc cosine of an angle x (in radians)
         * Math.atan(x) returns the arc tangent of an angle x (in radians)
         * Math.atan2(y, x) returns the arctangent of the quotient of its arguments
         * Math.exp(x) returns the value of Ex
         * Math.log(x) returns the natural logarithm (base E) of x
         * Math.pow(x, y) returns the value of x to the power of y
         * Math.max(a, b, c, d, ...) / Math.min(a, b, c, d, ...) returns the highest/lowest value in a list of arguments
         * Math.hypot(x, y) returns sqrt(x2 +y2) without intermediate overflow or underflow
         * Math.log10(x) returns the base 10 logarithm of x
         * Math.log1p(x) returns the natural logarithm of 1 + x
         * Math.log2(x) returns the base 2 logarithm of x
        */

        int a = Math.max(5, 10);        // returns 10
        System.out.println("Math.max(5, 10) = " + a);

        int b = Math.min(5, 10);        // returns 5
        System.out.println("Math.min(5, 10) = " + b);

        double c = Math.sqrt(64);       // returns 8.0
        System.out.println("Math.sqrt(64) = " + c);

        double d = Math.abs(-4.7);      // returns 4.7
        System.out.println("Math.abs(-4.7) = " + d);

        double e = Math.random();       // returns a random number between 0.0 (inclusive), and 1.0 (exclusive)
        System.out.println("Math.random() = " + e);
    }
}
