s = "mom"

# converting the string to a list
s_list = [i for i in s]

# generating the substrings of the given string
substrings = []
for i in range(len(s_list)):
    for j in range(i+1, len(s_list)+1):
        substrings.append(s[i:j])

print(f"substrings: {substrings}")

# sorting the characters in each substring
sorted_substrings = []
for i in substrings:
    sorted_substrings.append("".join(sorted(i)))

print(f"sorted_substrings: {sorted_substrings}")

# counting the number of anagrams
count = 0
for i in range(len(sorted_substrings)):
    for j in range(i+1, len(sorted_substrings)):
        if sorted_substrings[i] == sorted_substrings[j]:
            count += 1

print(f"count: {count}")