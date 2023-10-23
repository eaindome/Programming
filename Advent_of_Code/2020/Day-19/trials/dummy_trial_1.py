def is_valid(message, rule_number, rules):
    rule = rules[rule_number]
    remaining_message = message

    # If the rule directly matches a character, check if the message starts with it.
    if rule.startswith('"'):
        return message.startswith(rule[1])

    # If the rule consists of sub-rules separated by '|', check each alternative.
    if "|" in rule:
        alternatives = rule.split(" | ")
        for alt in alternatives:
            sub_rules = alt.split()
            remaining_message = message
            for sub_rule in sub_rules:
                if not remaining_message:
                    break
                if is_valid(remaining_message, int(sub_rule), rules):
                    return True
            return False

    # If the rule consists of space-separated sub-rules, check them sequentially.
    sub_rules = rule.split()
    for sub_rule in sub_rules:
        if not remaining_message:
            return False
        remaining_message = message
        if not is_valid(remaining_message, int(sub_rule), rules):
            return False
    return True

def main():
    rules = {
        0: "1 2",
        1: "2 3 | 3 2",
        2: '"a"',
        3: '"b"'
    }

    messages = ["ab", "ba", "aa", "bb", "abc", "aba", "aab"]

    for message in messages:
        if is_valid(message, 0, rules) and not message:
            print(f"'{message}' is a valid message.")
        else:
            print(f"'{message}' is not a valid message.")

if __name__ == "__main__":
    main()

'''
'ab' is not a valid message.
'ba' is not a valid message.
'aa' is not a valid message.
'bb' is not a valid message.
'abc' is not a valid message.
'aba' is not a valid message.
'aab' is not a valid message."
'''




