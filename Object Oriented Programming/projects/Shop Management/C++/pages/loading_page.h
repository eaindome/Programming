#ifndef LOADING_PAGE_H          // header tag for use in other files
#define LOADING_PAGE_H          // header tag for use in other files

#include <iostream>
#include <cstdlib>
#include <thread>
#include <windows.h>
#include <limits> // For clearing input buffer

const int BAR_WIDTH = 26;
const int SLEEP_MS = 200;

// function to clear the console screen
void clearConsole() {
    system("cls");
}

/*
// function to center text in a specified total width
void centerText(const std::string& text, int totalWidth) {
    int textWidth = static_cast<int>(text.length());
    int padding = (totalWidth - textWidth) / 2;
    std::cout << std::string(padding, ' ') << text << std::string(padding, ' ');
}
*/

// function to display the loading page with ASCII art
void loadingPage() {
    char emptySymbol = 177;
    char filledSymbol = 219;

    clearConsole();             // clear the console window
    system("color 07");

    // "The CC Shop" ASCII art
    std::cout << "\n\n\n\n\n";
    std::cout <<
        " /$$$$$$$$ /$$                        /$$$$$$   /$$$$$$         /$$$$$$  /$$                          \n"
        "|__  $$__/| $$                       /$$__  $$ /$$__  $$       /$$__  $$| $$                          \n"
        "   | $$   | $$$$$$$   /$$$$$$       | $$  \\__/| $$  \\__/      | $$  \\__/| $$$$$$$   /$$$$$$   /$$$$$$ \n"
        "   | $$   | $$__  $$ /$$__  $$      | $$      | $$            |  $$$$$$ | $$__  $$ /$$__  $$ /$$__  $$\n"
        "   | $$   | $$  \\ $$| $$$$$$$$      | $$      | $$             \\____  $$| $$  \\ $$| $$  \\ $$| $$  \\ $$\n"
        "   | $$   | $$  | $$| $$_____/      | $$    $$| $$    $$       /$$  \\ $$| $$  | $$| $$  | $$| $$  | $$\n"
        "   | $$   | $$  | $$|  $$$$$$$      |  $$$$$$/|  $$$$$$/      |  $$$$$$/| $$  | $$|  $$$$$$/| $$$$$$$/\n"
        "   |__/   |__/  |__/ \\_______/       \\______/  \\______/        \\______/ |__/  |__/ \\______/ | $$____/ \n"
        "                                                                                            | $$      \n"
        "                                                                                            | $$      \n"
        "                                                                                            |__/      \n";
    std::cout << "\n";
    std::cout << "\n\t\t\t\t\t\tLoading...\n";
    std::cout << std::endl;
    std::cout << "\t\t\t\t\t";

    // calculate the number of iterations needed for a 60-second delay
    int iterations = 60 * 1000 / SLEEP_MS;

    for (int i = 0; i < BAR_WIDTH; i++) {
        std::cout << emptySymbol;
    }

    std::cout << "\r";
    std::cout << "\t\t\t\t\t";

    for (int i = 0; i < BAR_WIDTH; i++) {
        std::cout << filledSymbol;
        // std::this_thread::sleep_for(std::chrono::milliseconds(SLEEP_MS));
        Sleep(SLEEP_MS);
    }
}

// function to display the landing page and get user input
void landingPage() {
    int choice;
    while (true) {
        // clear the console window
        clearConsole();

        std::cout << "\n\n\n\n\n";
        std::cout << 
            "\t\t\t             U _____ u  _        ____   U  ___ u  __  __  U _____ u \n"
            "\t\t\t __        __\\| ___\"|/ |\"|    U /\"___|   \\/\"_ \\/U|' \\/ '|u\\| ___\"|/ \n"
            "\t\t\t \\\"\\      /\"/ |  _|\" U | | u  \\| | u     | | | |\\| |\\/| |/ |  _|\"   \n"
            "\t\t\t /\\ \\ /\\ / /\\ | |___  \\| |/__  | |/__.-,_| |_| | | |  | |  | |___   \n"
            "\t\t\tU  \\ V  V /  U|_____|  |_____|  \\____|\\_)-\\___/  |_|  |_|  |_____|  \n"
            "\t\t\t.-,_\\ /\\ /_,-.<<   >>  //  \\  _// \\      \\   <<,-,,-.   <<   >>  \n"
            "\t\t\t \\_)-'  '-(_/(__) (__)(_\")(\"_)(__)(__)    (__)   (./  \\.) (__) (__) \n";

        // providing login options
        std::cout << "\n\n\n\n\t\t\t\t\t Login As : ";
        std::cout << "\n\n\n\t\t\t\t\t 1. Worker ";
        std::cout << "\n\n\t\t\t\t\t 2. Customer";
        std::cout << "\n\n\t\t\t\t\t 3. Exit";
        std::cout << "\n\n\n\t\t\t\t\t Enter your choice: ";

        if (!(std::cin >> choice)) {            // handle invalid input errors
            std::cout << "Invalid input. Please enter a valid number." << std::endl;
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        } else {
            switch (choice) {                   // cases for each choice
                case 1:
                    // Worker login
                    break;
                case 2:
                    clearConsole();
                    std::cout << "Welcome, Customer!" << std::endl;
                    // Customer page
                    break;
                case 3:
                    clearConsole();             // clear the console window
                    std::cout << "\t\t\n\n\n\n\n\n\n\t\t\t\t\t\t\tGoodbye";
                    for (int i = 0; i < 4; i++) {
                        Sleep(1000);
                        std::cout << ".";
                    }
                    exit(0);
                    break;
                default:
                    // inform user of invalid choice
                    std::cout << "Invalid choice. Please select a valid option (1-3)." << std::endl;
                    break;
            }
        }
        // Wait for user to press a key before continuing
        system("pause");
        clearConsole();
    }
}

#endif // LOADING PAGE

