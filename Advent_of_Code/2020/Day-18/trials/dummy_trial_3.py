import sympy

with open("./input.txt", "r") as file:
    expressions = [line.strip() for line in file]

for expression in expressions:
    expression = expression.replace(" ", "")
    parsed_expression = sympy.sympify(expression)
    result = sympy.evalf(parsed_expression)
    print(f"Expression: {expression}")
    print(f"Result: {result}")
    print()
