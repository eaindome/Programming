def RomanToInteger(s: str) -> int:
    roman = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    length = len(s)
    total = 0

    for i in range(length):
        if (i < length - 1) and (roman[s[i]] < roman[s[i + 1]]):
            total -= roman[s[i]]
        else:
            total += roman[s[i]]

    return total

# test cases
print(f"IV: {RomanToInteger('IV')}")