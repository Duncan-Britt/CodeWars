#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm>
#include <map>

using std::cout;            using std::endl;

bool desc(unsigned, unsigned);
void print_vec_uint(const std::vector<unsigned>&);
void print_vec_vec_uint(const std::vector<std::vector<unsigned>>&);
bool includes(const std::vector<unsigned>&, unsigned);
void remove_duplicates(const std::vector<std::vector<unsigned>>&, std::vector<std::vector<unsigned>>&);
bool includes_set(const std::vector<std::vector<unsigned>>&, std::vector<unsigned>);

void make_change(const unsigned int money, const std::vector<unsigned int>& cs, std::vector<std::vector<unsigned>>& changes)
{
    // REMOVE coins greater than money;
    std::vector<unsigned> coins;
    remove_copy_if(cs.begin(), cs.end(), back_inserter(coins), [money](int c) {
        return c > money;
    });

    if (coins.size() == 0) return;

    for (const unsigned& coin : coins)
    {
        if (money % coin == 0)
        {
            std::vector<unsigned int> sans_coin;
            remove_copy_if(coins.begin(), coins.end(), back_inserter(sans_coin), [coin](int c) { 
                return c >= coin;
            });

            std::vector<unsigned> change;
            unsigned sum = 0;
            while (sum < money)
            {
                change.push_back(coin);
                sum += coin;

                std::vector<std::vector<unsigned>> part_changes;
                make_change(money - sum, sans_coin, part_changes);

                std::vector<std::vector<unsigned>> other_changes;
                transform(part_changes.begin(), part_changes.end(), back_inserter(other_changes), [change](std::vector<unsigned> ch){
                    ch.insert(ch.end(), change.begin(), change.end());
                    return ch;
                });
                changes.insert(changes.end(), other_changes.begin(), other_changes.end());
            }
            changes.push_back(change);
        }
        else 
        {
            unsigned diff = money - coin;
            std::vector<std::vector<unsigned>> part_changes;
            make_change(diff, coins, part_changes);

            transform(part_changes.begin(), part_changes.end(), back_inserter(changes), [coin](std::vector<unsigned> ch){
                ch.push_back(coin);
                return ch;
            });
        }
    }

}

unsigned long long countChange(const unsigned int money, const std::vector<unsigned int>& cs)
{
    std::vector<std::vector<unsigned>> changes;
    make_change(money, cs, changes);

    print_vec_vec_uint(changes);
    cout << endl;

    std::vector<std::vector<unsigned>> unique_changes;
    remove_duplicates(changes, unique_changes);

    print_vec_vec_uint(unique_changes);
    cout << endl;

    return unique_changes.size();
}

int main()
{
    cout << countChange(5, {5, 2, 1}) << endl;;
    // countChange(4, {1,2}) == 3;
    // countChange(10, {5,2,3}) == 4;
    return 0;
}

void print_vec_vec_uint(const std::vector<std::vector<unsigned>>& changes)
{
    cout << "{" << endl;
    for (const std::vector<unsigned>& change : changes)
    {
        cout << "   ";
        print_vec_uint(change);
        cout << endl;
    }
    cout << "}";
}

void remove_duplicates(const std::vector<std::vector<unsigned>>& v, std::vector<std::vector<unsigned>>& u)
{
    for (const std::vector<unsigned>& change : v)
    {
        if (!includes_set(u, change))
        {
            u.push_back(change);
        }
    }
}

bool includes_set(const std::vector<std::vector<unsigned>>& vec, std::vector<unsigned> set)
{
    for (std::vector<unsigned> v : vec)
    {
        sort(v.begin(), v.end());
        sort(set.begin(), set.end());
        if (v.size() == set.size() && equal(v.begin(), v.end(), set.begin())) return true;
    }
    return false;
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
    cout << "}";
}

//   count_change(4, {1,2}) // => 3
//   count_change(10, {5,2,3}) // => 4
//   count_change(11, {5,7}) // => 0