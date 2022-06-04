package main

import (
    "fmt"
)

var clues = []int{
      0, 0, 1, 2,
      0, 2, 0, 0,
      0, 3, 0, 0,
      0, 1, 0, 0, }

// Test clue 4
// var clues = []int{
//       4, 0, 0, 0,
//       0, 0, 0, 0,
//       4, 0, 0, 0,
//       0, 0, 0, 0, }

var outcome = [][]int{
      { 2, 1, 4, 3 },
      { 3, 4, 1, 2 },
      { 4, 2, 3, 1 },
      { 1, 3, 2, 4 }, }

var cluesDict map[int][3]int = map[int][3]int{
//  s: 0=>top, 1=>right, 2=>bottom, 3=>left
//  i:  r, c, s
    0: {0, 0, 0},
    1: {0, 1, 0},
    2: {0, 2, 0},
    3: {0, 3, 0},
    4: {0, 3, 1},
    5: {1, 3, 1},
    6: {2, 3, 1},
    7: {3, 3, 1},
    8: {3, 3, 2},
    9: {3, 2, 2},
   10: {3, 1, 2},
   11: {3, 0, 2},
   12: {3, 0, 3},
   13: {2, 0, 3},
   14: {1, 0, 3},
   15: {0, 0, 3},
}

func spread(rcs [3]int) (int, int, int) {
    return rcs[0], rcs[1], rcs[2]
}

func filter(n int, p[]int) (r []int) {
    for i := 0; i < len(p); i++ {
        if p[i] != n {
            r = append(r, p[i])
        }
    }

    return r
}

func SolvePuzzle(clues []int) [][]int {
    p := [][][]int{
        {
            {1,2,3,4},
            {1,2,3,4},
            {1,2,3,4},
            {1,2,3,4},
        },
        {
            {1,2,3,4},
            {1,2,3,4},
            {1,2,3,4},
            {1,2,3,4},
        },
        {
            {1,2,3,4},
            {1,2,3,4},
            {1,2,3,4},
            {1,2,3,4},
        },
        {
            {1,2,3,4},
            {1,2,3,4},
            {1,2,3,4},
            {1,2,3,4},
        },
    }

    for i, clue := range clues {
        switch clue {
        case 1:
            r, c, _ := spread(cluesDict[i])
            for i := 0; i < len(p[r]); i++ {
                if i != c {
                    p[r][i] = filter(4, p[r][i])
                } else {
                    p[r][i] = []int{4}
                }

                if i != r {
                    p[i][c] = filter(4, p[i][c])
                } else {
                    p[i][c] = []int{4}
                }
            }
        case 2:
            r, c, _ := spread(cluesDict[i])
            // p[r][c] <= 3
            p[r][c] = filter(4, p[r][c])
        case 3:
            r, c, _ := spread(cluesDict[i])
            // p[r][c] <= 2
            p[r][c] = filter(4, p[r][c])
            p[r][c] = filter(3, p[r][c])
        case 4:
            r, c, s := spread(cluesDict[i])
            switch s {
            case 0:
                for i := 0; i < 4; i++ {
                    p[i][c] = []int{i+1}
                }
                filterColumnsByColumn(&p, c)
            case 1:
                p[r] = [][]int{{4}, {3}, {2}, {1}}
                filterRowsByRow(&p, r)
            case 2:
                n := 4
                for i := 0; i < 4; i++ {
                    p[i][c] = []int{n}
                    n--
                }
                filterColumnsByColumn(&p, c)
            case 3:
                p[r] = [][]int{{1}, {2}, {3}, {4}}
                filterRowsByRow(&p, r)
            }
        }
    }

    for i := 0; i < len(p); i++ {
        fmt.Println(p[i])
    }
    return [][]int{}
}

func filterColumnsByColumn(p *[][][]int, c int) {
    for j := 0; j < 4; j++ {
        if j != c {
            for i := 0; i < 4; i++ {
                (*p)[i][j] = filter((*p)[i][c][0], (*p)[i][j])
            }
        }
    }
}

func filterRowsByRow(p *[][][]int, r int) {
    for i := 0; i < len((*p)[r]); i++ {
        if i != r {
            for j := 0; j < 4; j++ {
                (*p)[i][j] = filter((*p)[r][j][0], (*p)[i][j])
            }
        }
    }
}

func main() {
    fmt.Println(SolvePuzzle(clues))
}
