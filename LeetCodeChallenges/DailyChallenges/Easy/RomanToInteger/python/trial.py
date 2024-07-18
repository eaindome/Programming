roman_symbls = {
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
sum = 0

for i in s:
    if i == "I":
        if s[1] == "V":
            sum = 4
        elif s[1] == "X":
            sum = 9
        else:
            sum += roman_symbls[i]
    elif i == "X":
        if s[1] == "L":
            sum = 50
        elif s[1] == "C":
            sum = 100
        else:
            sum += roman_symbls[i]
    elif i == "C":
        if s[1] == "D":
            sum = 500
        elif s[1] == "M":
            sum = 1000
        else:
            sum += roman_symbls[i]

print(f"Sum: {sum}")