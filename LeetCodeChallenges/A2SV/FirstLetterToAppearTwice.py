class Solution(object):
    def repeatedCharacter(self, s):
        """
        :type s: str
        :rtype: str
        """
        appearance = set()

        for char in s:
            if char in appearance:
                return char
            else:
                appearance.add(char)