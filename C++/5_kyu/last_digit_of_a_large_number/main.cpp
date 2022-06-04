#include <iostream> // DEBUGGING
#include <string>
#include <cmath>
#include <vector>
#include <algorithm>

using std::cout;
using std::endl;

int copy_cycle(const int& n, std::vector<int>& res)
{
    res.push_back(n);
    int acc = n * n;
    int digit = std::to_string(acc).rbegin()[0] - '0';
    int cycle_length = 1;
    digit = std::to_string(acc).rbegin()[0] - '0';

    while (digit != n) 
    {    
        res.push_back(digit);
        acc *= n;
        ++cycle_length;
        digit = std::to_string(acc).rbegin()[0] - '0';
    }

    return cycle_length;
}

bool nonzero(const char& c)
{
    return c != '0';
}

int get_power(const std::string& str) 
{
    std::string::const_reverse_iterator it = find_if(str.rbegin(), str.rend(), nonzero);
    return (it[0] - '0') * 10;
}

int last_digit(const std::string& str1, const std::string& str2) 
{
    if (str2.size() == 1 && std::stoi(str2) == 0)
        return 1;

    int n = str1.rbegin()[0] - '0';
    std::vector<int> cycle;
    int cycle_length = copy_cycle(n, cycle);
    
    int power = std::stoi(std::string(str2.end() - std::min(3, (int)str2.size()), str2.end()));
    if (power == 0 && str2.size() > 1)
        power = get_power(str2);
    
    return cycle[(power - 1) % cycle_length];
}

int main() 
{
    cout << "Expected: 4 Actual: " << last_digit("4", "1") << endl;            // returns 4
    cout << "Expected: 6 Actual: " << last_digit("4", "2") << endl;            // returns 6
    cout << "Expected: 9 Actual: " << last_digit("9", "7") << endl;            // returns 9    
    cout << "Expected: 0 Actual: " << last_digit("10","10000000000") << endl;  // returns 0
    cout << "Expected: 7 Actual: " << last_digit("3715290469715693021198967285016729344580685479654510946723", "68819615221552997273737174557165657483427362207517952651") << endl;
    cout << "Expected: 7 Actual: " << last_digit("7","5") << endl;  
    cout << "Expected: 9 Actual: " << last_digit("7","2") << endl;  
    cout << "Expected: 3 Actual: " << last_digit("7","3") << endl;
    cout << "Expected: 1 Actual: " << last_digit("4200574979866020043461928", "0") << endl;  
    cout << "Expected: 4 Actual: " << last_digit("2", "2") << endl;  
    cout << "Expected: 6 Actual: " << last_digit("8", "8") << endl;  
    cout << "Expected: 4 Actual: " << last_digit("28", "58") << endl;  
    cout << "Expected: 1 Actual: " << last_digit("43", "60") << endl;  
    cout << "Expected: 4 Actual: " << last_digit("92", "74") << endl;
    cout << "Expected: 6 Actual: " << last_digit("38", "91620000") << endl;
    cout << "Expected: 9 Actual: " << last_digit("79", "27") << endl;

    // 28 58
    // 8 18
    // 28 92
    // 43 60 expected 1 got 9
    // 39 81 expected 9 got 1
    // 92 74 expected 4 got 8
    // 79 27 expected 9 got 1

    // for (int i = 0; i < 10; ++i)
    // {
    //     cout << i << ": ";
    //     std::vector<int> cycle;
    //     int cycle_length = copy_cycle(i, cycle);
    //     for (std::vector<int>::const_iterator it = cycle.begin(); it < cycle.end(); ++it)
    //     {
    //         cout << *it << " ";
    //     }
    //     cout << endl;
    // }

    return 0;
}