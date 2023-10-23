def generate_valid_messages(rule_number, rules):
    rule = rules[rule_number]

    # If the rule directly matches a character, return a list with that character.
    if rule.startswith('"'):
        return [rule[1]]

    valid_messages = []
    alternatives = rule.split(" | ")
    for alt in alternatives:
        sub_rules = alt.split()
        partial_messages = [""]
        for sub_rule in sub_rules:
            sub_messages = generate_valid_messages(int(sub_rule), rules)
            new_partial_messages = []
            for message in partial_messages:
                for sub_message in sub_messages:
                    new_partial_messages.append(message + sub_message)
            partial_messages = new_partial_messages
        valid_messages += partial_messages

    return valid_messages

def main():
    rules = {
        0: "1 2",
        1: "2 3 | 3 2",
        2: '"a"',
        3: '"b"'
    }

    valid_messages = generate_valid_messages(0, rules)
    messages = ["ab", "ba", "aa", "bb", "abc", "aba", "aab"]

    for message in messages:
        if message in valid_messages:
            print(f"'{message}' is a valid message.")
        else:
            print(f"'{message}' is not a valid message.")

if __name__ == "__main__":
    main()
