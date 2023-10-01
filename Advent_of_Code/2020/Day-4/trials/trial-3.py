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
        "ecl":"gry",
        "pid":"860033327",
        "eyr":"2020", 
        "hcl":"#fffffd",
        "byr":"1937", 
        "iyr":"2017",
        "cid":"147", 
        "hgt":"183cm"    
    },
    {
        "iyr":"2013", 
        "ecl":"amb",
        "cid":"350", 
        "eyr":"2023", 
        "pid":"028048884",
        "hcl":"#cfa07d", 
        "byr":"1929"
    },
    {
        "hcl":"#ae17e1", 
        "iyr":"2013",
        "eyr":"2024",
        "ecl":"brn", 
        "pid":"760753108", 
        "byr":"1931",
        "hgt":"179cm"
    },
    {
        "hcl":"#cfa07d", 
        "eyr":"2025", 
        "pid":"166559648",
        "iyr":"2011", 
        "ecl":"brn", 
        "hgt":"59in"
    }
]

count = 0

def is_valid_passport(passport):
    #print(f"passport[0]'s keys: {passports[0].keys()}")

    field = dict(fields)
    field.pop("cid", None)

    """print(f"Field: {field}\n"
        f"field cid out: {field}")


    print(f"passport keys: {passports[1].keys()}")
    print(f"field without cid keys: {field.keys()}")"""

    """if "cid" in passports[0]:
        passports[0].pop("cid", None)"""
    
    passports_exclude_cid = {key: value for key, value in passport.items() if key != "cid"}

    return set(passports_exclude_cid.keys()) == set(field.keys())
    

for passport in passports:
    if is_valid_passport(passport):
        count += 1
    else:
        continue

print(f"Valid passports: {count}")