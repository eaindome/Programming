#include <iostream>

class Solution {
    public:
        int subtractProductAndSum(int n){
            int product = 1; 
            int sum_digit = 0;
            
            while (n>0) {
                int digit = n%10;
                product *= digit;
                sum_digit += digit;
                n /= 10;
            }

            return product - sum_digit;
        }
};