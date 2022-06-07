#include <stdexcept>
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

using std::cout;            using std::endl;
using std::vector;          

typedef vector<int> ints;

void print_ints(vector<int>);
void print_ints_vec(vector<vector<int>>);
void int_part(int, vector<vector<int>>&);

int main() 
{
    vector<vector<int>> partition;
    int_part(5, partition);
    print_ints_vec(partition);

    return 0;
}

void int_part(int sum, vector<vector<int>>& res)
{
    vector<int> init_xs = vector<int>{sum};
    vector<int>* xs = &init_xs;
    vector<int> next_xs;
    int current_sum = sum;

    while (true) 
    {
        current_sum = accumulate(xs->begin(), xs->end(), 0);

        if (current_sum == sum)
        {
            res.push_back(*xs); 
            vector<int>::iterator it = find(xs->begin(), xs->end(), 1);
            if (it == xs->begin()) return;
            next_xs.erase(next_xs.begin(), next_xs.end());
            copy(xs->begin(), it, back_inserter(next_xs));
            next_xs[next_xs.size() - 1] -= 1;
            xs = &next_xs;
        }
        else 
        {
            int tail = xs->back();
            int diff = sum - current_sum;
            int m = std::min(tail, sum - tail);
            int next_tail = current_sum + m > sum ? diff : m;
            xs->push_back(next_tail);
        }
    }
}

void print_ints(ints v)
{
    cout << "[ ";
    for (const int& n : v) { cout << n << "; "; }
    cout << "]" << endl;
}

void print_ints_vec(vector<ints> v)
{
    cout << "[ \n";
    for (const vector<int>& xs : v) { cout << "  "; print_ints(xs); }
    cout << "]" << endl;
}