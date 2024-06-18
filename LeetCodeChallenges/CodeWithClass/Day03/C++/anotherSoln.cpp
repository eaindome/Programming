class Solution {
public:
    int calPoints(vector<string>& operations) {
        stack<int> st;
        for (auto s: operations) {
            if (s == "C") {
                if (!st.empty()) 
                    st.pop();
                continue;
            }
            if (!st.empty() && s == "D") {
                int t = st.top();
                st.push(t*2);
                continue;
            }
            if (!st.empty() && s == "+") {
                int t = st.top();
                st.pop();
                int s = st.top();
                st.push(t);
                st.push(s+t);
                continue;
            }
            cout << s << endl;
            //cout << stoi(s) << endl;
            st.push(stoi(s));
        }

        int ans = 0;
        while (!st.empty()) {
            ans += st.top();
            st.pop();
        }
        return ans;
    }
};