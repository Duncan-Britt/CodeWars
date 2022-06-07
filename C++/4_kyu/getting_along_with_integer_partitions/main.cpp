#include <stdexcept>
#include <iostream>
#include <stdio.h>
#include <string>
#include <vector>
#include <algorithm>
#include <numeric>
#include <map>

using std::cout;            using std::endl;
using std::vector;          using std::map; 

typedef vector<long long> ints;

long long multiply(const long long& acc, const long long& n) { return acc * n; }

void int_part(long long sum, vector<ints>& res)
{
    ints xs = ints{sum};
    int current_sum = sum;

    while (true) 
    {
        current_sum = accumulate(xs.begin(), xs.end(), 0);

        if (current_sum == sum)
        {
            res.push_back(xs);
            ints::iterator it = find(xs.begin(), xs.end(), 1);
            if (it == xs.begin()) return;
            xs.erase(it, xs.end());
            xs[xs.size() - 1] -= 1;
        }
        else 
        {
            ints next_xs = xs;
            long long tail = xs.back();
            long long diff = sum - current_sum;
            long long m = std::min(tail, sum - tail);
            long long next_tail = current_sum + m > sum ? diff : m;
            next_xs.push_back(next_tail);
            xs = next_xs;
        }
    }
}

class IntPart
{
public:
  static std::string part(long long n);
};

std::string IntPart::part(long long n)
{
    vector<ints> partition;
    int_part(n, partition);

    ints products;
    map<long long, bool> seen;

    for (const ints& part : partition)
    {
        long long n = accumulate(part.begin(), part.end(), 1, multiply);
        if (!seen[n])
        {
            products.push_back(n);
            seen[n] = true;
        }
    }

    sort(products.begin(), products.end());
    
    long long range = products.back() - products[0];
    long double average = ((long double) accumulate(products.begin(), products.end(), 0)) / ((long double) products.size());
    ints::size_type mid = products.size() / 2;
    long double median = products.size() % 2 == 0 ? ((long double) products[mid-1] + products[mid]) / 2.0: products[mid];
    char buffer[80];
    sprintf(buffer, "Range: %lld Average: %.2Lf Median: %.2Lf", range, average, median);
    return (std::string) buffer;
}

void testequal(const std::string& actual, const std::string& expected)
{
    if (actual != expected) 
        cout << "Expected: " << expected << endl
             << "Actual: " << actual << endl;
    else 
        cout << "✓" << endl;
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
    for (const vector<long long>& xs : v) { cout << "  "; print_ints(xs); }
    cout << "]" << endl;
}

int main() 
{
    testequal(IntPart::part(1), "Range: 0 Average: 1.00 Median: 1.00");
    testequal(IntPart::part(2), "Range: 1 Average: 1.50 Median: 1.50");
    testequal(IntPart::part(3), "Range: 2 Average: 2.00 Median: 2.00");
    testequal(IntPart::part(4), "Range: 3 Average: 2.50 Median: 2.50");
    testequal(IntPart::part(5), "Range: 5 Average: 3.50 Median: 3.50");
    // vector<ints> partition;
    // int_part(4, partition);
    // print_ints_vec(partition);

    return 0;
}

// Range: 5 Average: 3.50 Median: 3.50

// input: n
//     integer in range [1, 50]
// output:
//     string representing the range, average, median, and median of the unique products of integer partitions