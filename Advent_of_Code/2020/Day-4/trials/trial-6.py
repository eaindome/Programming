import re # import the re module

# function to check if passport is valid
def is_valid_passport(passport):
    # fields required for a passport
    fields = {
        "byr": lambda val: 1920 <= int(val) <= 2002,
        "iyr": lambda val: 2010 <= int(val) <= 2020,
        "eyr": lambda val: 2020 <= int(val) <= 2030,
        "hgt": lambda val: (val.endswith("cm") and 150 <= int(val[:-2]) <= 193) or
                            (val.endswith("in") and 59 <= int(val[:-2]) <= 76),
        "hcl": lambda val: re.match(r'^#[0-9a-f]{6}$', val) is not None,
        "ecl": lambda val: val in {"amb," "blu", "brn", "gry", "grn", "hzl", "oth"},
        "pid": lambda val: re.match(r'^\d{9}$', val) is not None,
        "cid": lambda val: True     # always true since it's optional
    }

    # check each field according to its validation rule
    for field, rule in fields.items():
        if field in passport:
            value = passport[field]
            if not rule(value):
                return False    # field is present but doesn't pass validation
        elif field != "cid":
            return False        # required field is missing
    return True     # fields pass validation
    
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