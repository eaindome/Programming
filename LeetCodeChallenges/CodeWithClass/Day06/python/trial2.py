s = "rat" 
t = "car"


s_list = list(s)
t_list = list(t)

def isAnagram(s_list, t_list):
    if len(s_list) != len(t_list):
        return False
    else:
        for i in s_list:
            if i in t_list:
                t_list.remove(i)

        if len(t_list) == 0:
            return True
        else:
            return False

print(f"Is {s} and {t} and anagram: {isAnagram(s_list, t_list)}")