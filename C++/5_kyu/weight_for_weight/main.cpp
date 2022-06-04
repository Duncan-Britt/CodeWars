#include <iostream>
#include <string>
#include <algorithm>
#include <sstream>
#include <list>
#include <iterator>
#include <numeric>

using std::cout;        using std::endl;

class WeightSort
{
public:
    static std::string orderWeight(const std::string &strng);
    static bool compare(const std::string& a, const std::string& b);
};

bool WeightSort::compare(const std::string& a, const std::string& b)
{
    auto to_i = [](const char& c) { return c - '0'; };
    auto sum_func = [to_i](const char& c, int acc) { return acc + to_i(c); };
    int n = accumulate(a.begin(), a.end(), 0, sum_func), 
        m = accumulate(b.begin(), b.end(), 0, sum_func);   
    return n == m ? a < b : n < m;
}

void join(std::list<std::string>::const_iterator it, std::list<std::string>::const_iterator jt, std::string& res)
{
    while (it != jt) res.append(*it++ + " ");
    if (res.size() != 0) res.erase(res.end() - 1);
}

std::string WeightSort::orderWeight(const std::string& string)
{ 
    std::istringstream iss(string);
    std::list<std::string> l;
    for (std::string s; iss >> s; l.push_back(s)) {}

    l.sort(WeightSort::compare);

    std::string ret;
    join(l.begin(), l.end(), ret);
    
    return ret;
}

int main() 
{
    cout << WeightSort::orderWeight("99 103 123 2000 4444") << endl; // "2000 103 123 4444 99"

    return 0;
}