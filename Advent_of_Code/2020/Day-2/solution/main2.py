def main():    
    with open("./input.txt", "r") as file:
        lines = file.readlines()

    valid_password = 0
    password_policies = []

    for line in lines:
        parts = line.strip().split(" ")
        position_str, character, password = parts[0], parts[1][0], parts[2]

        # split the "position" value into pos1 and pos2 
        pos_num_1, pos_num_2 = position_str.split("-")

        # convert the position values into integers
        pos1 = int(pos_num_1)
        pos2 = int(pos_num_2)

        policy = {
            "positions": f"{pos1}-{pos2}",
            "character": character,
            "password": password
        }
        password_policies.append(policy)


    for policy in password_policies:
        # split the "position" value into pos1 and pos2 
        pos_num_1, pos_num_2 = position_str.split("-")

        # convert the position values into integers
        pos1 = int(pos_num_1)
        pos2 = int(pos_num_2)

        '''
        print(f"character in position 1: {policy['password'][pos1 - 1]}; "
              f"character in position 2: {policy['password'][pos2 - 1]}")
        print()'''
        # check if the first and last position match the policy character
        if (policy['password'][pos1 - 1] == policy['character']) and (policy['password'][pos2 - 1] == policy['character']):
            continue
        # check if either the first or last position match the policy character
        elif (policy['password'][pos1 - 1] == policy['character']) or (policy['password'][pos2 - 1] == policy['character']):
            valid_password += 1     # increase the count of a valid password policy
        else:
            continue
    
    # print the total number of valid passwords
    print(f"Valid-passwords: {valid_password}")

if __name__ == "__main__":
    main()