####################### Scope ###########################

enemies = 1

def increase_enemies():
    enemies = 2
    print(f"Enemies inside function: {enemies}")

increase_enemies()
print(f"enemies outside function: {enemies}")

# local scope
def drink_potion():
    potion_strength = 2
    print(potion_strength)
drink_potion()
#print(potion_strength)         # uncommenting this line will produce an error because of local scope

# global scope
player_health = 10

def drink_potion():
    potion_strength = 2
    print(player_health)

drink_potion()