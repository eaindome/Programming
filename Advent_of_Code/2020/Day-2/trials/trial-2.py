password_policies = [
    {
        "range": "1-3",
        "character": "a",
        "password": "abcde"
    },
    {
        "range": "1-3",
        "character": "b",
        "password": "cdefg"
    },
    {
        "range": "2-9",
        "character": "c",
        "password": "ccccccccc"
    }
]


#print(len(password_policies))
#for i in password_policies:
#    print(i)

#print(password_policies[0]["range"])
# print(type(print(password_policies[0]["range"])))

min, max = password_policies[1]["range"].split("-")
#print(f"min: {min}\nmax: {max}")
print(f"min: {min}, type: {type(min)}\nmax: {max}, type: {type(max)}")

min_count = int(min)
max_count = int(max)
print(f"min_count: {min_count}, type: {type(min_count)}\nmax_count: {max_count}, type: {type(max_count)}")

#print(f"{password_policies[1]['character']} count in {password_policies[1]['password']}: {password_policies[1]['password'].count(password_policies[1]['character'])}")

letter_count = password_policies[1]['password'].count(password_policies[1]['character'])
# print(f"letter_count: {letter_count}")

if min_count <= letter_count:
    if letter_count <= max_count:
        print("Okay")
else:
    print("Invalid")
    