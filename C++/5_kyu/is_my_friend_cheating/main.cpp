#include <iostream>
#include <vector>

using namespace std;

long long sum_up_to(const long long& n) { return n * (n + 1) / 2; }

class RemovedNumbers
{
public:
	static vector<vector<long long>> removNb(long long n);
};

vector<vector<long long>> RemovedNumbers::removNb(long long n)
{
    vector<vector<long long>> ret;

    long long sum = sum_up_to(n);
    for (long long k = (n / 2); k <= n; ++k)
    {
        long long x = (sum - k) / (k + 1);
        if (x * k == sum - k - x) 
        {
            // cout << "x * k: " << x << " * " << k << endl;
            ret.push_back(vector<long long>{k, x});
        }
    }

    return ret;
}

void print_tuples(const vector<vector<long long>>& v)
{
    for (vector<vector<long long>>::const_iterator it = v.begin(); it < v.end(); ++it)
    {
        cout << "[ ";
        const vector<long long>& tuple = *it;
        for (vector<long long>::const_iterator it = tuple.begin(); it < tuple.end(); ++it)
        {
            cout << *it << "; ";
        }
        cout << "] ";
    }
    cout << endl;
}

int main() 
{
    cout << sum_up_to(26) << endl;
    print_tuples(RemovedNumbers::removNb(26));
}