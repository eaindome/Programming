def is_valid_message(rules, message):
    def match_rule(rule_num, text):
        if isinstance(rules[rule_num], str):
            if text.startswith(rules[rule_num]):
                return text[len(rules[rule_num]):]
            else:
                return None
        else:
            for option in rules[rule_num]:
                rest = text
                for sub_rule in option:
                    rest = match_rule(sub_rule, rest)
                    if rest is None:
                        break
                if rest is not None:
                    return rest
            return None
    
    return match_rule(0, message) == ''



# changing the data structure
rules = {
    0: [[4, 1, 5]],
    1: [[2, 3], [3, 2]],
    2: [[4, 4], [5, 5]],
    3: [[4, 5], [5, 4]],
    4: "a",
    5: "b"
}

messages = [
    "ababbb",
    "bababa",
    "abbbab",
    "aaabbb",
    "aaaabbb"
]

count = 0
for message in messages:
    if is_valid_message(rules, message):
        count += 1
        print(f"'{message}' is a valid message.")

print(f"Number of valid messages: {count}")