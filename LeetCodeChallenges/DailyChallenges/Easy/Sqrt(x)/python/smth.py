# s = 4.3
# s_string = "4.3"

# if '.' in s_string:
#     print("True")


# print(80//2)
x = 25

if x < 2:
    print("x")
else:
    left, right = 0, x
    step = 1
    while left <= right:
        print(f"Step {step}: ")
        mid = (left + right) // 2
        print(f"mid = {mid}")
        if (mid * mid) == x:
            print(f"Sqrt of {x}: {mid}")
        elif (mid * mid) < x:
            left = mid + 1
            print(f"left = {left}")
        else:
            right = mid - 1
            print(f"right = {right}")
        step += 1
        if step > 10:
            break
        print()


print(f"sqrt of {x}: {right}")
        

