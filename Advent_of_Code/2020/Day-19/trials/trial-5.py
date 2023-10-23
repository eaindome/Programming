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

def generate_modified_rules():
    modified_rules = {
        8: [[42], [42, 8]],
        11: [[42, 31], [42, 11, 31]]
    }
    return modified_rules

def count_valid_messages(rules, messages):
    count = 0
    for message in messages:
        if is_valid_message(rules, message):
            count += 1
    return count

# Read the rules and messages from an input text file
with open("input2.txt", "r") as file:
    lines = file.read().splitlines()

# Check if we need to generate modified rules
if "8: 42 | 42 8" in lines and "11: 42 31 | 42 11 31" in lines:
    rules = generate_modified_rules()
    lines.remove("8: 42 | 42 8")
    lines.remove("11: 42 31 | 42 11 31")

# parse the rules and messages
rules = {}
messages = []
parsing_rules = True

for line in lines:
    if line == "":
        parsing_rules = False
    elif parsing_rules:
        rule_num, rule_def = line.split(": ")
        if '"' in rule_def:
            rules[int(rule_num)] = rule_def.strip('"')
        else:
            sub_rules = [list(map(int, option.split())) for option in rule_def.split(" | ")]
            rules[int(rule_num)] = sub_rules
    else:
        messages.append(line)

# count how many messages match rule 0
valid_count = count_valid_messages(rules, messages)

print(f"Number of valid messages: {valid_count}")
