import java.util.*;

public class rti {
    public static void main(String[] args) {
        HashMap<Character, Integer> roman = new HashMap<>();    // initialize hashmap

        // place vital roman numerals in hashmap
        roman.put('I', 1);
        roman.put('V', 5);
        roman.put('X', 10);
        roman.put('L', 50);
        roman.put('C', 100);
        roman.put('D', 500);
        roman.put('M', 1000);	
        
        String s = "MCMXCIV";    // test case
        int result = 0;   // initialize result

        for (int i=0; i<s.length(); i++) {
            if ((i<s.length()-1) && (roman.get(s.charAt(i))<roman.get(s.charAt(i+1)))) {
                result -= roman.get(s.charAt(i));
            }
            else {
                result += roman.get(s.charAt(i));
            }
        }
        System.out.println("MCMXCIV: " + result);
    }
}