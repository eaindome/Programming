rules = {
    "0": "1 2",
    "1": "a",
    "2": "1 3 | 3 1",
    "3": "b"
}

messages = [
    "ab", "ba", "aa", "bb", "abc", "aba"
]

for message in messages:
    rule = rules["0"]

    # if the rule directly matches a character
    # check if the message starts with it
    if '"' in rule:
        print(message.startswith(rule[1]))
        break
    
    # if the rule consists of sub-rules separated 
    # by '|', check each alternative
    if "|" in rule:
        alternatives = rule.split(" | ")
        for alt in alternatives:
            sub_rules = alt.split()
            remaining_message = message
            for sub_rule in sub_rules:
                if not remaining_message:
                    break
    
    # if the rule consists of space-separated sub-rules,
    # check
    sub_rules = rule.split()
    for sub_rule in sub_rules:
        if not remaining_message:
            break
        remaining_message = message

print("This won't work, gotta use recursion and a function")



