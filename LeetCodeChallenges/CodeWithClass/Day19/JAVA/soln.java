import java.util.*;

class soln {
    public String[] findWords(String[] words) {
        List<Set<Character>> keyboard = Arrays.asList(
            new HashSet<>(Arrays.asList('q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p')),
            new HashSet<>(Arrays.asList('a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l')),
            new HashSet<>(Arrays.asList('z', 'x', 'c', 'v', 'b', 'n', 'm'))
        );

        List<String> keyWords = new ArrayList<>();

        for (String word: words) {
            String lowerWord = word.toLowerCase();
            for (Set<Character> row: keyboard) {
                if (lowerWord.chars().allMatch(c -> row.contains((char) c))) {
                    keyWords.add(word);
                    break;
                }
            }
        }
        return keyWords.toArray(new String[0]);
    }
}