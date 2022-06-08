#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm>

using std::cout;            using std::endl;

bool desc(unsigned, unsigned);
void print_vec_uint(const std::vector<unsigned>&);

unsigned long long countChange(const unsigned int money, const std::vector<unsigned int>& coins) 
{
    if (coins.size() == 0) return 0;

    std::vector<unsigned> coins_copy;
    copy(coins.begin(), coins.end(), back_inserter(coins_copy));
    sort(coins_copy.begin(), coins_copy.end(), desc);

    // cout << "money: " << money << " coins: ";
    // print_vec_uint(coins_copy);

    unsigned coin = coins_copy[0];
    if (coin > money) // GOOD
    {
        cout << "HERE" << endl;
        std::vector<unsigned> cdr_coins_copy;
        copy(coins_copy.begin() + 1, coins_copy.end(), back_inserter(cdr_coins_copy));
        return countChange(money, cdr_coins_copy);
    }
    else if (coin == money)
    {
        std::vector<unsigned> cdr_coins_copy;
        copy(coins_copy.begin() + 1, coins_copy.end(), back_inserter(cdr_coins_copy));

        return 1; //+ countChange(money, cdr_coins_copy);
    }
    else // coin < money 
    {
        unsigned long long total = 0;
        std::vector<unsigned>::size_type start = 0;
    
        while (start < coins_copy.size())
        {
            std::vector<unsigned> cdr_coins_copy;
            copy(coins_copy.begin() + start, coins_copy.end(), back_inserter(cdr_coins_copy));

            total += countChange(money - coin, cdr_coins_copy);
            // cout << "total: " << total << " money - coin: " << money - coin << " cdr_coins: ";
            // print_vec_uint(cdr_coins_copy);

            cout << "money: " << money << " total: " << total << " coins: ";
            print_vec_uint(coins);
            cout << "cdr: ";
            print_vec_uint(cdr_coins_copy);
            cout << endl;
            start++;
        }
        return total;
    }
}

int main()
{
    cout << "combos: " << countChange(10, {5, 2, 3}) << endl;;

    // countChange(4, {1,2}) == 3;
    // countChange(10, {5,2,3}) == 4;
    return 0;
}

bool desc(unsigned a, unsigned b)
{
    return a > b;
}

void print_vec_uint(const std::vector<unsigned>& v)
{
    cout << "{ ";
    for (std::vector<unsigned>::const_iterator it = v.begin(); it < v.end(); ++it)
    {
        cout << *it << ", ";
    }
    cout << "}" << endl;
}

//   count_change(4, {1,2}) // => 3
//   count_change(10, {5,2,3}) // => 4
//   count_change(11, {5,7}) // => 0