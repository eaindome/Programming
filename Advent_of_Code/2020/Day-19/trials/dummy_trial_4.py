def is_valid(message, rule_number, rules):
    rule = rules[rule_number]
    remaining_message = message

    if rule.startswith('"'):
        return message.startswith(rule[1])

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

    sub_rules = rule.split()
    for sub_rule in sub_rules:
        if not remaining_message:
            return False
        remaining_message = message
        if not is_valid(remaining_message, int(sub_rule), rules):
            return False
    return True

def messages_matching_rule0(messages, rules):
    matching_messages = []
    for message in messages:
        if is_valid(message, 0, rules) and not message:
            matching_messages.append(message)
    return matching_messages

def main():
    rules = {
        0: "1 2",
        1: "2 3 | 3 2",
        2: '"a"',
        3: '"b"'
    }

    messages = ["ab", "ba", "aa", "bb", "abc", "aba", "aab"]

    matching_messages = messages_matching_rule0(messages, rules)
    
    if matching_messages:
        print("Messages matching rule 0:")
        for message in matching_messages:
            print(f"'{message}' is a valid message.")
    else:
        print("No messages match rule 0.")

if __name__ == "__main__":
    main()
