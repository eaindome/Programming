# Define the list of password policies
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

# Iterate through each password policy
for policy in password_policies:
    # split the "range" value into minimum and maximum 
    min, max = policy["range"].split("-")

    # convert the range values into integers
    min_count = int(min)
    max_count = int(max)

    # count the occurrences of the character in the password
    char_count = policy["password"].count(policy["character"])

    # check if the count of a character is within the specified range
    if min_count <= char_count <= max_count:
        print(f"The password '{policy['password']}' is valid for policy '{policy['range']}'")
    else:
        print(f"The password '{policy['password']}' is invalid for policy '{policy['range']}'")


#min_count, max_count = map(int, policy["range"].split("-"))

