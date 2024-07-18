package Day19.JAVA;
import java.util.*;

public class key {
    public String[] findWords(String[] words) {
        List<String> keyboard = Arrays.asList("qwertyuiop", "asdfghjkl", "zxcvbnm");

        List<String> keyWords = new ArrayList<>();

        for (String word: words) {
            String lowerWord = word.toLowerCase();
            for (String value: keyboard) {
                if (lowerWord.chars().allMatch(c -> value.indexOf(c) != -1)) {
                    keyWords.add(word);
                    break;
                }
            }
        }
        return keyWords.toArray(new String[0]);
    }
}
