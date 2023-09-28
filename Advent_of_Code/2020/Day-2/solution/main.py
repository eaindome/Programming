def main():    
    with open("./input.txt", "r") as file:
        lines = file.readlines()

    valid_password = 0
    password_policies = []

    # converting text lines into preferred data structure; List with Dictionaries
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


    for policy in password_policies:            # iterate through each password policy
        # split the "range" value into minimum and maximum 
        min, max = policy["range"].split("-")   

        # convert the splitted values from strings into integers
        min_count = int(min)
        max_count = int(max)

        # count the occurrences of the character in the password
        char_count = policy["password"].count(policy["character"])

        # check if the count of a character is within the specified range
        if min_count <= char_count <= max_count:
            # increase the count of a valid password policy by 1
            valid_password += 1

    # print the total number of valid passwords
    print(f"Valid passwords: {valid_password}")

if __name__ == "__main__":
    main()