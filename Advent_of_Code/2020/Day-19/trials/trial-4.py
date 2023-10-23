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
    
    def is_valid(message):
        for i in range(1, len(message)):
            part1 = message[:i]
            part2 = message[i:]
            rest1 = match_rule(42, part1)
            if rest1 is not None:
                rest2 = match_rule(31, part2)
                if rest2 is not None and rest2 == "":
                    return True
            if not rest1:
                break
        return False

    return is_valid(message)

# read the rules and messages from input 2 text file
with open("./input2.txt", "r") as file:
    lines = file.read().splitlines()

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

count = 0
for message in messages:
    if is_valid_message(rules, message):
        count += 1
        print(f"'{message}' is a valid message.")

print(f"Number of valid messages: {count}")