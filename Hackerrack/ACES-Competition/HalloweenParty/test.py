k = 6

if k%2 == 0:
    print((k//2) * (k//2))  # type: ignore
else:
    print((k//2) * ((k//2)+1)) # type: ignore