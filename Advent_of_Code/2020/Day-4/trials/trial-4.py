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

passports = [
    {
        "ecl": "gry",
        "pid": "860033327",
        "eyr": "2020",
        "hcl": "#fffffd",
        "byr": "1937",
        "iyr": "2017",
        "cid": "147",
        "hgt": "183cm"
    },
    {
        "iyr": "2013",
        "ecl": "amb",
        "cid": "350",
        "eyr": "2023",
        "pid": "028048884",
        "hcl": "#cfa07d",
        "byr": "1929"
    },
    {
        "hcl": "#ae17e1",
        "iyr": "2013",
        "eyr": "2024",
        "ecl": "brn",
        "pid": "760753108",
        "byr": "1931",
        "hgt": "179cm"
    },
    {
        "hcl": "#cfa07d",
        "eyr": "2025",
        "pid": "166559648",
        "iyr": "2011",
        "ecl": "brn",
        "hgt": "59in"
    }
]

# define a function to check if a passport is valid
def is_valid_passport(passport):
    # "cid" is optional, so we remove it from both fields and the passport for comparison
    fields_without_cid = dict(fields)
    fields_without_cid.pop("cid", None)
    passport_without_cid = {key: value for key, value in passport.items() if key != "cid"}

    # check if all keys in the passport are present in fields_without_cid
    return set(passport_without_cid.keys()) == set(fields_without_cid.keys())

# check all passports
for i, passport in enumerate(passports):
    if is_valid_passport(passport):
        print(f"Passport {i + 1} is valid")
    else:
        print(f"Passport {i + 1} is invalid")
