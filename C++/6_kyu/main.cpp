#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <iterator>

using std::cout;
using std::endl;

int chr_to_int(const char& n)
{
    return n - '0';
}

int persistence(long long n)
{
    // break into digits
    // product of digits
    // is 1 digit long? 
    //     return count
    // else 
    //     increment count
    //     repeat 

    int count = 0;
    std::string s = std::to_string(n);

    while (s.size() > 1)
    {
        // std::vector<int> xs;
        // transform(s.begin(), s.end(), back_inserter(xs), chr_to_int);

        // n = 1;
        // for (int& x : xs)
        // {
        //     n *= x;
        // }
        // s = std::to_string(n);
        int product = 1;
        for (const char& chr : std::to_string(n))
        {
            product *= (chr - '0');
        }

        s = std::to_string(product);
        n = product;
        ++count;
    }
    
    return count;
}

int main() 
{
    cout << persistence(999) << endl;
    return 0;
}