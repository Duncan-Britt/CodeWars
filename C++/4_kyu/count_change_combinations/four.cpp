#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm>
#include <map>

using std::cout;            using std::endl;
using std::map;             using std::vector;

typedef unsigned long long big;

big countChange(const unsigned int money, const vector<unsigned int>& cs)
{
    vector<unsigned> coins;
    copy(cs.begin(), cs.end(), back_inserter(coins));
    sort(coins.begin(), coins.end());
    
    map<unsigned, vector<big>> change_chart;

    for (vector<unsigned>::iterator coin_it = coins.begin(); coin_it < coins.end(); ++coin_it)
    {
        change_chart[*coin_it] = vector<big>{}; // index == money

        for (long long n = 0; n <= money; ++n)
        {
            if (n == 0)
            {
                change_chart[*coin_it].push_back(1);
            }
            else 
            {
                big upper = coin_it == coins.begin() ? 0 : change_chart[*(coin_it - 1)][n];  
                big left = n - ((long long) *coin_it) >= 0 ? change_chart[*coin_it][n - *coin_it] : 0;

                change_chart[*coin_it].push_back(upper + left);
            }
        }
    }

    return change_chart[coins.back()][money];
}

int main()
{
    cout << countChange(4, {1, 2}) << endl;;
    // countChange(4, {1,2}) == 3;
    // countChange(10, {5,2,3}) == 4;
    return 0;
}