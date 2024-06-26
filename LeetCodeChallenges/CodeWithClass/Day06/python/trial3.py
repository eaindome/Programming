from collections import Counter

def isAnagram(s1, s2):
    return Counter(s1) == Counter(s2)

s = "rat" 
t = "car"
print(f"Is rat and car an anagram: {isAnagram(s, t)}")

s = "anagram"
t = "nagaram"
print(f"Is anagram and nagaram an anagram: {isAnagram(s, t)}")
