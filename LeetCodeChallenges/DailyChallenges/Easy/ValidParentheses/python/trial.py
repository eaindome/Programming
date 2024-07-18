s = "()"

while "()" in s or "[]" in s or "{}" in s:
    s = s.replace('{}', '').replace('()', '').replace('[]', '')
    
if len(s) != 0:
    print("False")
else:
    print("True")