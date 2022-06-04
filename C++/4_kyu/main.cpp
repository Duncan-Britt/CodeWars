#include <iostream>
#include <string>
#include <vector>
#include <iterator>
#include <numeric>

using namespace std;

void reverse(string& s)
{
    string::size_type size = s.size();
    for (string::size_type i = 0; i < size / 2; ++i)
    {
        char a = s[i];
        char b = s[size - i - 1];
        s[i] = b;
        s[size - i - 1] = a;
    }
}

string add(string a, string b)
{
    string ret;
    int carry = 0;
    string::const_reverse_iterator it = a.rbegin(), jt = b.rbegin();
    while (it < a.rend() || jt < b.rend())
    { 
        int n = it >= a.rend() ? 0 : *it - '0', m = jt >= b.rend() ? 0 : m = *jt - '0';
        // cout << "n: " << n << " + m: " << m << " + c: " << carry << endl;
        int sum = n + m + carry;
        // cout << "sum: " << sum << endl;
        string sum_str = to_string(sum);
        string carry_s;
        copy(sum_str.begin(), sum_str.end() - 1, back_inserter(carry_s));
        // cout << "carry_s: " << carry_s << endl;
        carry = carry_s.size() == 0 ? 0 : stoi(carry_s);
        ret.append(sum_str.substr(sum_str.size() - 1, 1));
        // cout << ret << endl << endl;
        ++it, ++jt;
    }

    reverse(ret);

    return carry != 0 ? to_string(carry) + ret : ret;
}

string multiply(string a, string b) 
{
    string::iterator it = begin(a);
    while (it < end(a) && *it == '0' ) { ++it; }
    a.erase(begin(a), it);

    it = begin(b);
    while (it < end(b) && *it == '0' ) { ++it; }
    b.erase(begin(b), it);

    if (a.size() == 0 || b.size() == 0) return "0";

    vector<string> partial_products;
    unsigned zeros = 0;

    for (string::const_reverse_iterator jt = a.rbegin(); jt < a.rend(); ++jt)
    {
        int f1 = *jt - '0';
        string intermittent_product;
        int carry = 0;
        for (string::const_reverse_iterator it = b.rbegin(); it < b.rend(); ++it)
        {
            int f2 = *it - '0';
            int p = f1 * f2 + carry;
            string p_str = to_string(p);
            string carry_s;
            copy(p_str.begin(), p_str.end() - 1, back_inserter(carry_s));
            carry = carry_s.size() == 0 ? 0 : stoi(carry_s);
            intermittent_product.append(p_str.substr(p_str.size() - 1, 1));
        }

        reverse(intermittent_product);
        if (carry != 0) intermittent_product = to_string(carry) + intermittent_product;
        partial_products.push_back(intermittent_product + string(zeros, '0'));
        ++zeros;
    }

    string s;
    return accumulate(begin(partial_products), end(partial_products), s, add);
}

int main() 
{
    // cout << add("901002349", "502334787") << endl;
    cout << multiply("00001", "4929356289") << endl;
    // string s = "1234";
    // reverse(s);
    // cout << s << endl;
    return 0;
}