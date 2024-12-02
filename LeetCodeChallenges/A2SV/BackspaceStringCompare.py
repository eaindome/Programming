class Solution(object):
    def backspaceCompare(self, s, t):
        """
        :type s: str
        :type t: str
        :rtype: bool
        """
        s_stack = []
        t_stack = []

        for char in s:
            if char == '#':
                if s_stack:
                    s_stack.pop()
            else:
                s_stack.append(char)

        for char in t:
            if char == '#':
                if t_stack:
                    t_stack.pop()
            else:
                t_stack.append(char) 

        if "".join(s_stack) == "".join(t_stack):
            return True
        else: 
            return False