#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm>

using std::cout;            using std::endl;

bool desc(unsigned, unsigned);
void print_vec_uint(const std::vector<unsigned>&);
bool includes(const std::vector<unsigned>& v, unsigned n);

unsigned long long countChange(const unsigned int money, const std::vector<unsigned int>& cs)
{
    // REMOVE coins greater than money;
    std::vector<unsigned> coins;
    remove_copy_if(cs.begin(), cs.end(), back_inserter(coins), [money](int c) {
        return c >= money;
    });

    if (coins.size() == 0) return 0;

    unsigned long long total = 0;
    for (const unsigned& coin : coins)
    {
        if (money % coin == 0)
        {
            std::vector<unsigned int> sans_coin;
            remove_copy_if(coins.begin(), coins.end(), back_inserter(sans_coin), [coin](int c) { 
                return c >= coin;
            });

            // cout << "Coin: " << coin << " others: ";
            // print_vec_uint(sans_coin);

            total++;
            for (unsigned i = 0; i < money / coin; ++i)
            {
                total += countChange(coin, sans_coin);
            }
        }
        else 
        {
            unsigned diff = money - coin;
            total += countChange(diff, coins);
        }
    }

    return total;
}

int main()
{
    cout << countChange(10, {5, 2, 3}) << endl;;

    // countChange(4, {1,2}) == 3;
    // countChange(10, {5,2,3}) == 4;
    return 0;
}

bool includes(const std::vector<unsigned>& v, unsigned n)
{
    std::vector<unsigned>::const_iterator it = find(v.begin(), v.end(), n);
    return it != v.end();
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