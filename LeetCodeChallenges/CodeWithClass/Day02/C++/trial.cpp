#include <vector>
using namespace std;

class Solution {
    public:
        vector<int> findDisappearedNumbers(vector<int>& nums) {
            int n = nums.size();
            vector<bool> ref(n, false);
            for (int num : nums) {
                ref[num - 1] = true;
            }

            vector<int> result;
            for (int i = 0; i < n; i++) {
                if (!ref[i]) {
                    result.push_back(i + 1);
                }
            }
            return result;
        }
};

int main() {
    Solution sol;
    vector<int> nums = {4, 3, 2, 7, 8, 2, 3, 1};
    vector<int> result = sol.findDisappearedNumbers(nums);
    return 0;
}