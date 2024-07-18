package ValidParentheses.JAVA;
import java.util.Stack;
import java.util.HashMap;

public class soln {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        HashMap<Character, Character> mapping = new HashMap<>();

        mapping.put(')', '(');
        mapping.put('}', '{');
        mapping.put(']', '[');

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);

            if (mapping.containsKey(c)) {
                char topElement = stack.empty() ? '#' : stack.pop();
                if (topElement != mapping.get(c)) {
                    return false;
                }
            } else {
                stack.push(c);
            }
        }

        return stack.isEmpty();
    }
}
