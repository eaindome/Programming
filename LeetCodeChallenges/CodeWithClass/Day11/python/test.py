prices = [8, 4, 6, 2, 3]

# print(f"stack[-1]: {stack[-1] if stack else 'stack is empty'}")
# print(f"prices[stack[-1]]: {prices[stack[-1]] if stack else 'stack is empty'}")

stack = []
for i in range(len(prices)):
    print(f"stack: {stack}")
    while stack and prices[stack[-1]] >= prices[i]:
        print(f"Step {i}: stack: {stack}, prices[stack[-1]]: {prices[stack[-1]]}, prices[i]: {prices[i]}\n")
        prices[stack.pop()] -= prices[i]
    stack.append(i)

