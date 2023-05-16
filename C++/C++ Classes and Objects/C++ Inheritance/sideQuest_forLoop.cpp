/*
Ranged Based for Loop
    Syntax:
        for(variable : collection) {
            // body of loop
        }
*/


#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

int main() {
    int num_array[] = {1,2,3,4,5,6,7,8,9,10};

    for (auto n : num_array){
        cout<<n<<" "<<endl;
    }

    // Given a vector of integers, print all the even numbers:
    vector<int> num = {1,2,3,4,5,6,7,8,9,10};

    for(auto m : num){
        if(m%2 == 0)
            cout<<m<<endl;
    }

    // Given a string, count the frequency of each character and print the result
    string str = "Hello world";
    unordered_map<char, int> freq;

    for(auto ch: str){
        freq[ch]++;
    }

    for (const auto& pair : freq) {
        const char ch = pair.first;
        const int count = pair.second;
        cout << ch << " occurs " << count << " times." << endl;
    }


    // Given a vector of strings, concatenate all the strings into one:
    vector<string> words = {"Hello", "world,", "this", "is", "a", "sentence"};
    string sentence = "";

    for(auto word : words) {
        sentence += word + " ";
    }

    cout<<sentence<<endl;

    // Given a vector of pairs, print the sum of each pair:
    vector<pair<int, int>> nums = {{1,2}, {3,4}, {5,6}, {7,8}, {9,10}};

    for (const auto& pair: nums){
        const int x = pair.first;
        const int y = pair.second;
        cout<<x<<" + "<<y<<" = "<<x+y<<endl;
    }
    
    /*(auto [x,y]: nums){
        cout<<x+y<<" ";
    }*/

    // Given a 2D vector of integers, print each row:
    vector<vector<int>> matrix = {{1,2,3}, {4,5,6}, {7,8,9}};

    for(auto row: matrix){
        for(auto num: row){
            cout<<num<<" ";
        }
    }

    return 0;
}







