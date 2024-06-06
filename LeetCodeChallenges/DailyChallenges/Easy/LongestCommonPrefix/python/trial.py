strs = ["flower","flow","flight"]

str = ""
prefix = strs[0]

for string in strs[1:]:
    while not string.startswith(prefix):
        prefix = prefix[:-1]
        if not prefix:
            str = ""

print(f"Prefix: {prefix}")
