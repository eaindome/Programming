bracket_map = {
    '(': ')',
    '{': '}',
    '[': ']'
}

stack = []

s = "()]"

for char in s:
    if char in bracket_map:
        top_element = stack.pop() if stack else "#"
        if bracket_map[char] != top_element:
            print("False")
        else:
            stack.append(char)

if len(stack) != 0:
    print("True")
        