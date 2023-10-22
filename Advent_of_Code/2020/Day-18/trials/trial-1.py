
expressions = [
    '1 + (2 * 3) + (4 * (5 + 6))',
    '1 + 2 * 3 + 4 * 5 + 6',
    '2 * 3 + (4 * 5)',
    '1 + (2 * 3) + (4 * (5 + 6))',
    '5 + (8 * 3 + 9 + 3 * 4 * 3)',
    '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
    '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'
]

# operators = {'+', '-', '*', '/'}

i = 0
stack = []
operators = []

for expression in expressions:
    expression = expression.replace(" ", "")
    print(expression)
    
    while i < len(expression):
        if expression[i].isdigit():
            num = ""
            while i < len(expression) and expression[i].isdigit():
                num += expression[i]
                i += 1
            stack.append(int(num))
        elif expression[i] in "+-*/":
            while operators and operators[-1] in "+-*/":
                stack.append(operators.pop())
            operators.append(expression[i])
            i += 1
        elif expression[i] == "(":
            operators.append(expression[i])
            i += 1
        elif expression[i] == ")":
            while operators[-1] != "(":
                stack.append(operators.pop())
            operators.pop()
            i += 1
        else:
            i += 1

    while operators:
        stack.append(operators.pop())
    
    break
    ...

print(f"Stack: {stack}\n"
      f"Operators: {operators}")