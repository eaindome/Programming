print('''
*******************************************************************************
          |                   |                  |                     |
 _________|________________.=""_;=.______________|_____________________|_______
|                   |  ,-"_,=""     `"=.|                  |
|___________________|__"=._o`"-._        `"=.______________|___________________
          |                `"=._o`"=._      _`"=._                     |
 _________|_____________________:=._o "=._."_.-="'"=.__________________|_______
|                   |    __.--" , ; `"=._o." ,-"""-._ ".   |
|___________________|_._"  ,. .` ` `` ,  `"-._"-._   ". '__|___________________
          |           |o`"=._` , "` `; .". ,  "-._"-._; ;              |
 _________|___________| ;`-.o`"=._; ." ` '`."\` . "-._ /_______________|_______
|                   | |o;    `"-.o`"=._``  '` " ,__.--o;   |
|___________________|_| ;     (#) `-.o `"=.`_.--"_o.-; ;___|___________________
____/______/______/___|o;._    "      `".o|o_.--"    ;o;____/______/______/____
/______/______/______/_"=._o--._        ; | ;        ; ;/______/______/______/_
____/______/______/______/__"=._o--._   ;o|o;     _._;o;____/______/______/____
/______/______/______/______/____"=._o._; | ;_.--"o.--"_/______/______/______/_
____/______/______/______/______/_____"=.o|o_.--""___/______/______/______/____
/______/______/______/______/______/______/______/______/______/______/[TomekK]
*******************************************************************************
''')
print("Welcome to Treasure Island!")
print("Your mission is to find the treasure.")

print("You are at a crossroad, where do you want to go?")
direction = input("Left or Right?\nEnter l or r: ").lower()

if direction == 'l':
    print("Great! Now, you've come across a lake, what do you want to do?")
    action = input("Swim or Wait for a boat? Enter S or W: ").lower()
    if action == 'w':
        print("Nice! You've now arrived at the island. There are three secret passages, with 3 separate colors on their doors:")
        print("Choose a color; Red, Yellow or Blue: ")
        colour = input("Enter R, Y or B: ").lower()
        if colour == 'r':
            print("Game Over! You fell in a pit of fire\nTry Again in the after life!")
        elif  colour == 'b':
            print("Game Over! You were swallowed by an anaconda\nTry Again in the after life!")
        elif colour == 'y':
            print("You win, Great! Enjoy your loot of treasure :)")
        else:
            print("Invalid direction, you are lost on the island, be careful")
            print("Oops!!!, you steped on a booby trap. Ouch, sorry for the poison arrows!")
            print("Game Over! \nTry again in the afterlife.")
        
    else:
        print("Game Over!\nTry Again!")
else:
    print("Game Over!\nTry Again")
