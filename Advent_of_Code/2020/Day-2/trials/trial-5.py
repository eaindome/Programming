with open("./input.txt", "r") as file:
    lines = file.readlines()

valid_password = 0
password_policies = []

for line in lines:
    parts = line.strip().split(" ")
    range_str, character, password = parts[0], parts[1][0], parts[2]

    min, max = range_str.split("-")
    min_count = int(min)
    max_count = int(max)

    policy = {
        "range": f"{min_count}-{max_count}",
        "character": character,
        "password": password
    }
    password_policies.append(policy)


for policy in password_policies:
    #print(policy)
    min, max = policy["range"].split("-")
    min_count = int(min)
    max_count = int(max)
    #print(f"min_count: {min_count}\nmax_count: {max_count}")

    char_count = policy["password"].count(policy["character"])
    #print(f"character {policy['character']}: password {policy['password']}; character_count: {char_count}")

    if min_count <= char_count <= max_count:
        valid_password += 1
        #print(f"The password '{policy['password']}' is valid for policy '{policy['range']}'")
    #else:
        #print(f"The password '{policy['password']}' is invalid for policy '{policy['range']}'")


#print(f"Password-policies: {password_policies}")
print(f"Valid passwords: {valid_password}")