def main():    
    with open("./input.txt", "r") as file:
        lines = file.readlines()

    valid_password = 0
    password_policies = []

    for line in lines:
        parts = line.strip().split(" ")
        position_str, character, password = parts[0], parts[1][0], parts[2]

        pos_num_1, pos_num_2 = position_str.split("-")
        pos1 = int(pos_num_1)
        pos2 = int(pos_num_2)

        policy = {
            "positions": f"{pos1}-{pos2}",
            "character": character,
            "password": password
        }
        password_policies.append(policy)


    for policy in password_policies:
        pos_num_1, pos_num_2 = policy["positions"].split("-")
        pos1 = int(pos_num_1)
        pos2 = int(pos_num_2)

        # Check if the character appears at exactly one of the specified positions
        if (policy['password'][pos1 - 1] == policy['character']) ^ (policy['password'][pos2 - 1] == policy['character']):
            valid_password += 1
            
    print(f"Valid-passwords: {valid_password}")
if __name__ == "__main__":
    main()