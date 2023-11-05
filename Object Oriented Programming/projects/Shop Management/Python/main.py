from pages.loadingPage import landingPage, loadingPage, clearConsole, exit_program

def main():
    try:
        # call the loading page function
        loadingPage()

        # call the landing page function
        landingPage()

    except KeyboardInterrupt:
        # handle a keyboard interrupt (Ctrl+C)
        clearConsole()
        print("\n\nInterrupted by the user.")
        exit_program()

if __name__ == "__main__":
    main()

