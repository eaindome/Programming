#include <vector>
#include <string>

class Solution {
    public:
        int calPoints(vector<string>& operations) {
            vector<int> score;
            for (string op:operations) {
                if (op == "C") {
                    score.pop_back();
                } else if (op == "D") {
                    score.push_back(score.back()*2)
                } else if (op == "+") {
                    score.push_back(score.back() + score[score.size()-2]);
                } else {
                    score.push_back(stoi(op));
                }
            }
            return accumulate(score.begin(), score.end(), 0);
        }
};

int main() {
    Solution sol;
    vector<string> operations = {"5","2","C","D","+"};
    int res = sol.calPoints(operations);
    return 0;
}