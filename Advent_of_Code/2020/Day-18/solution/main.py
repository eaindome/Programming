def main():
    with open("./input.txt", "r") as file:
        expressions = [line.strip() for line in file] 

    all_result = []

    for expression in expressions:
        i = 0
        stack = []
        operators = []

        expression = expression.replace(" ", "")
        #print(expression)
        
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
        
        result = []
        for item in stack:
            if isinstance(item, int):
                result.append(item)
            elif item in "+-*/":
                b = result.pop()
                a = result.pop()
                if item == '+':
                    result.append(a + b)
                elif item == '-':
                    result.append(a - b)
                elif item == '*':
                    result.append(a * b)
                elif item == '/':
                    result.append(a / b)

        print(f"Expression {expression} = {result[0]}\n")
        all_result.append(result[0])
    #print(f"Results: {all_result}")

if __name__ == "__main__":
    main()