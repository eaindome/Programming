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

if "ecl" in fields:
    print("Okay")

if "cid" in passports[2]:
    print("Double Okay")


'''
for passport in passports:
    if passport.keys() in fields:
        print("yeah")
    else:
        print("Try again")
'''

print(f"passport[0]'s keys: {passports[0].keys}")
'''
for key, passport in passports:
    print(key)'''

field = dict(fields)
field_cid = field.pop("cid", None)

print(f"Field: {field}\n"
      f"field cid out: {field_cid}")


print(f"passport keys: {passports[1].keys()}")

for passport in enumerate(passports):
    print(passport)
    print()
