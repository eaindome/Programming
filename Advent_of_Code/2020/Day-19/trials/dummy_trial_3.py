import re

def parse_rules_and_messages(input_text):
    rules, messages = input_text.strip().split('\n\n')
    rules_dict = {}
    
    for rule in rules.split('\n'):
        rule_id, rule_content = rule.split(': ')
        rules_dict[rule_id] = rule_content

    return rules_dict, messages.split('\n')

def build_regex(rules_dict, rule_id):
    rule = rules_dict[rule_id]
    
    if rule[0] == '"':
        return rule[1]
    else:
        sub_rules = rule.split()
        regex_parts = []

        for part in sub_rules:
            if part == '|':
                regex_parts.append(part)
            else:
                regex_parts.append(build_regex(rules_dict, part))

        return f'({"".join(regex_parts)})'

def main(input_text):
    rules_dict, messages = parse_rules_and_messages(input_text)
    rule0_regex = build_regex(rules_dict, '0')
    rule0_regex = f"^{rule0_regex}$"

    valid_messages = 0
    for message in messages:
        if re.match(rule0_regex, message):
            valid_messages += 1

    return valid_messages

# Example input
input_text = """
0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb
"""

result = main(input_text)
print(f"Number of valid messages: {result}")
