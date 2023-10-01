# function to check if passport is valid
def is_valid_passport(passport):
    # fields required for a passport
    fields = {
        "byr": "Birth Year",
        "iyr": "Issue Year",
        "eyr": "Expiration Year",
        "hgt": "Height",
        "hcl": "Hair Color",
        "ecl": "Eye Color",
        "pid": "Passport ID",
        "cid": "Country ID",
    }

    # removing "cid" since it's optional
    field = dict(fields)
    field.pop("cid", None)
    passports_exclude_cid = {key: value for key, value in passport.items() if key != "cid"}

    # checking if all keys in the passports are present in the compulsory fields
    return set(passports_exclude_cid.keys()) == set(field.keys())
    
def main():
    # read passport data from the text file
    with open("./input.txt", "r") as file:
        lines = file.read().split("\n\n")
        
    count = 0

    # split lines into individual passports and parse them
    passports = []
    for line in lines:
        passport_data = line.split()
        passport = {}
        for data in passport_data:
            key, value = data.split(":")
            passport[key] = value
        passports.append(passport)

    # check all passports in the list
    for passport in passports:
        if is_valid_passport(passport):
            count += 1                  # increase count if a passport is valid

    print(f"Valid passports: {count}")

if __name__ == "__main__":
    main()