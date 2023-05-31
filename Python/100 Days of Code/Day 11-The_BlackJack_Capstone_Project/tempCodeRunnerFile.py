while True:
        play_again = input("Do you want to play again? Enter 'yes' or 'no':\n")
        if play_again == 'yes':
            os.system('cls')
            BlackJack()
            break
        elif play_again == 'no':
            print('Thank you for playing this game, hope you had fun!\nSee you again.')
            break
        else:
            print("Incorrect input. Please enter 'yes' or 'no' to start the game.")