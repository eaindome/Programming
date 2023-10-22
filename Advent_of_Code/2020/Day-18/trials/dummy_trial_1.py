def evaluate_expression(expression):
    # Replace spaces in the expression to make it easier to work with
    expression = expression.replace(" ", "")

    def evaluate_helper(expression):
        stack = []
        operators = []

        i = 0

        while i < len(expression):
            if expression[i].isdigit():
                # Extract the entire number (supports multi-digit numbers)
                num = ""
                while i < len(expression) and expression[i].isdigit():
                    num += expression[i]
                    i += 1
                stack.append(int(num))
            elif expression[i] in "+-*/":
                while (
                    operators
                    and operators[-1] in "+-*/"
                    and (
                        (expression[i] in "+-" and operators[-1] in "*/")
                        or (expression[i] in "*/" and operators[-1] in "*/")
                    )
                ):
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

        print(f"Stacke: {stack}"
              f"Operators: {operators}")
        while operators:
            stack.append(operators.pop())

        return stack

    postfix_expression = evaluate_helper(expression)

    stack = []

    for item in postfix_expression:
        if isinstance(item, int):
            stack.append(item)
        elif item in "+-*/":
            b = stack.pop()
            a = stack.pop()
            if item == '+':
                stack.append(a + b)
            elif item == '-':
                stack.append(a - b)
            elif item == '*':
                stack.append(a * b)
            elif item == '/':
                stack.append(a / b)

    return stack[0]

expression = '1 + (2 * 3) + (4 * (5 + 6))'
result = evaluate_expression(expression)
print(f"The result of the expression is: {result}")

