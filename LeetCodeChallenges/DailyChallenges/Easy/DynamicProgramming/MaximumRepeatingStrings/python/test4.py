sequence = "aaabaaaabaaabaaaabaaaabaaaabaaaaba"
word = "aaaba"

left, right = 0, len(sequence) // len(word) + 1
while left < right:
    mid = (left + right) // 2
    if word * mid in sequence:
        left = mid + 1
    else:
        right = mid

k_repeating = left - 1

print(f"Maximum k-repeating value: {k_repeating}")