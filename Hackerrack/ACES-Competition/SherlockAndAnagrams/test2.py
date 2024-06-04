from collections import Counter

def count_anagram_substrings(s):
    # getting all substrings
    substrings = [''.join(sorted(s[i:j])) for i in range(len(s)) for j in range(i+1, len(s)+1)]
    
    # count occurrences of each substring
    counter = Counter(substrings)
    
    # count the number of anagram pairs
    count = sum(v*(v-1)//2 for v in counter.values())
    
    return count

s = "mom"
print(count_anagram_substrings(s))