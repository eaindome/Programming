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

# Define the rules
rules = {
    0: [[1, 2]],
    1: 'a',
    2: [[1, 3], [3, 1]],
    3: 'b'
}

# Test with example messages
messages = ["aab", "aba", "abc"]
messages = ["ab", "ba", "aa", "bb", "abc", "aba", "aab"]

for message in messages:
    if is_valid_message(rules, message):
        print(f"'{message}' is a valid message.")
    else:
        print(f"'{message}' is not a valid message.")

