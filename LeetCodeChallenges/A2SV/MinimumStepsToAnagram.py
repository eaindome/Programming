class Solution:
    def minSteps(self, s: str, t: str) -> int:
        # Array to store the frequency of each character in the strings
        v = [0] * 26
        
        # Loop through each character in the strings and update the frequency array
        for char_s, char_t in zip(s, t):
            # Increment the count for the current character in string s
            v[ord(char_s) - ord('a')] += 1
            # Decrement the count for the current character in string t
            v[ord(char_t) - ord('a')] -= 1
        
        # Variable to store the total steps needed to make the strings anagrams
        result = 0
        
        # Loop through the frequency array and calculate the absolute differences
        # between the counts of characters in the two strings
        for i in v:
            # Accumulate the absolute differences in the result variable
            result += abs(i)
        
        # Return the total steps needed, which is half of the absolute differences
        return result // 2