package main

import (
	"fmt"
)

/*
validate rows
validate columns
validate squares
*/

var testTrue = [][]int{
	{5, 3, 4, 6, 7, 8, 9, 1, 2},
	{6, 7, 2, 1, 9, 5, 3, 4, 8},
	{1, 9, 8, 3, 4, 2, 5, 6, 7},
	{8, 5, 9, 7, 6, 1, 4, 2, 3},
	{4, 2, 6, 8, 5, 3, 7, 9, 1},
	{7, 1, 3, 9, 2, 4, 8, 5, 6},
	{9, 6, 1, 5, 3, 7, 2, 8, 4},
	{2, 8, 7, 4, 1, 9, 6, 3, 5},
	{3, 4, 5, 2, 8, 6, 1, 7, 9},
}

var testFalse = [][]int{
	{5, 3, 4, 6, 7, 8, 9, 1, 2},
	{6, 7, 2, 1, 9, 0, 3, 4, 8},
	{1, 0, 0, 3, 4, 2, 5, 6, 0},
	{8, 5, 9, 7, 6, 1, 0, 2, 0},
	{4, 2, 6, 8, 5, 3, 7, 9, 1},
	{7, 1, 3, 9, 2, 4, 8, 5, 6},
	{9, 0, 1, 5, 3, 7, 2, 1, 4},
	{2, 8, 7, 4, 1, 9, 6, 3, 5},
	{3, 0, 0, 4, 8, 1, 1, 7, 9},
}

func validRows(m [][]int) bool {
    if len(m) == 0 {
        return true
    }
    return validRow(m[0]) && validRows(m[1:])
}

func validRow(row []int) bool {
    nums := make(map[int]int, len(row))

    for _, n := range row {
        nums[n]++
    }

    return validSet(nums)
}

func validCols(m [][]int) bool {
    for c := 0; c < 9; c++ {
        nums := make(map[int]int, 9)

        for r := 0; r < 9; r++ {
            nums[m[r][c]]++
        }

        if !validSet(nums) {
            return false
        }
    }

	return true
}

func validSet(nums map[int]int) bool {
    for _, count := range nums {
        if count != 1 {
            return false
        }
    }
    return true
}

func validSquare(rs, cs int, m [][]int) bool {
    nums := make(map[int]int, 9)

    for r := rs; r < rs+3; r++ {
        for c := cs; c < cs+3; c++ {
            nums[m[r][c]]++
        }
    }

    return validSet(nums)
}

func validSquares(m [][]int) bool {
    for cs := 0; cs != 9; cs += 3 {
        for rs := 0; rs != 9; rs += 3 {
            if !validSquare(rs, cs, m) {
                return false
            }
        }
    }

    return true
}

func ValidateSolution(m [][]int) bool {
	return validRows(m) && validCols(m) && validSquares(m)
}

func main() {
	fmt.Println(validRows(testTrue) == true)
	fmt.Println(validRows(testFalse) == false)
    fmt.Println(validCols(testTrue) == true)
	fmt.Println(validCols(testFalse) == false)
    fmt.Println(validSquares(testTrue) == true)
	fmt.Println(validSquares(testFalse) == false)
    fmt.Println(ValidateSolution(testTrue) == true)
	fmt.Println(ValidateSolution(testFalse) == false)
}
