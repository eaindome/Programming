roman_symbols = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
}

s = "IV"
t = "LVIII"
total = 0

for i in range(len(s)):
    if i < len(s) - 1 and roman_symbols[s[i]] < roman_symbols[s[i+1]]:
        total -= roman_symbols[s[i]]
    else:
        total += roman_symbols[s[i]]

print(f"Sum: {total}")