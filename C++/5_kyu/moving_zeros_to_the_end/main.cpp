#include <iostream>
#include <vector>
#include <algorithm>

using std::cout;        using std::endl;

void print_vec(const std::vector<int>& v) 
{
    for (const int& n : v) { cout << n << " "; }
    cout << endl;
}

std::vector<int> move_zeroes(const std::vector<int>& input) 
{
    std::vector<int> v = input;
    stable_sort(v.begin(), v.end(), [](int a, int b) { return a != 0 && b == 0;});
    return v;
}

int main() {
    print_vec(move_zeroes(std::vector<int>{1, 0, 1, 2, 0, 1, 3})); // returns {1, 1, 2, 1, 3, 0, 0}
    print_vec(move_zeroes(std::vector<int>{-1, 0, -1, -2, 0, -1, -3})); // returns {-1, -1, -2, -1, -3, 0, 0}
    print_vec(move_zeroes(std::vector<int>{-6, -18, -4, -4, -1, 4, -4, 4, 3, -9, 7, 3, -2, -14, -1, 10, 16, 1, 7, -4, -15, 4, 8, -8, 9, -4, -12, -4, -19, -17, 7, 17, -2, 10, 15, 1, -6, 12, -1, -19, -6, 15, 9, 19, -6, 8, -8, 3, 8, -1, -8, -14, -15, -1, -8, -10, 0, -13, 6, 18, -11, 19, -10, -4, -1, 13, 17, -15, 15, -10, -15, -19, 7}));
    return 0;
}