class Solution(object):
    def mergeAlternately(self, word1, word2):
        """
        :type word1: str
        :type word2: str
        :rtype: str
        """
        maxLength = max(len(word1), len(word2))
        mergedStrings = ""

        for i in range(maxLength):
            if i < len(word1):
                mergedStrings += word1[i]
            if i < len(word2):
                mergedStrings += word2[i]

        return mergedStrings