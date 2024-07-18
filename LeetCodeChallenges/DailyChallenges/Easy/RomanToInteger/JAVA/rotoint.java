public class rotoint {
    public static void main(String[] args) {
        // array to store values of roman numerals
        int[] romanValues = {1, 5, 10, 50, 100, 500, 1000};

        // test case
        String s = "MCMXCIV";
        int result = 0;

        // iterate through the string
        for (int i=0; i<s.length(); i++) {
            char current = s.charAt(i);
            // char next = (i<s.length()-1) ? s.charAt(i + 1): '\0';
            char next;
            if (i < s.length() - 1) {
                next = s.charAt(i + 1);
            } else {
                next = '\0';
            }

            // switch statement to calculate result based on current and next Roman numerals
            switch (current) {
                case 'I':
                    // result += (next == 'V' || next == 'X') ? -1:1;
                    if (next == 'V' || next == 'X') {
                        result -= 1;
                    } else {
                        result += 1;
                    }
                    break;
                case 'V':
                    result += 5;
                    break;
                case 'X':
                    result += (next == 'L' || next == 'C') ? -10:10;
                    break;
                case 'L' :
                    result += 50;
                    break;
                case 'C':
                    result += (next == 'D' || next == 'M') ? -100:100;
                    break;
                case 'D':
                    result += 500;
                    break;
                case 'M':
                    result += 1000;
                    break;

                default:
                    break;
            }
        }
        System.out.println("MCMXCIV " + result);
    }
}
