// ranks: A|a => 1, B|b => 2...
//
// som(name) = len(fname) + sum(ranks)
//
// winning num(som, weight) = som * weight
//
// sort by desc winning num, alphabetical if equal.
//
// return name corresponding to the appropriate rank (n) (1 indexed)

package main

import (
	"fmt"
    "strings"
    "sort"
)

func rank(name string) int {
    rank := 0

    for _, chr := range name {
        if chr >= 'a' {
            rank += int(chr) - 96
        } else {
            rank += int(chr) - 64
        }
    }

    return rank
}

func som(name string) int {
    return len(name) + rank(name)
}

func winningNum(name string, weight int) int {
    return som(name) * weight
}

func nameWinNums(st string, we []int) map[string]int {
    names := strings.Split(st, ",")

    people := make(map[string]int)

    for i, name := range names {

         people[name] = winningNum(name, we[i])
    }

    return people
}

type personT struct {
    name string
    winN int
}

type byWinNum []personT

func (p byWinNum) Swap(i, j int) {
    p[i], p[j] = p[j], p[i]
}

func (p byWinNum) Less(i, j int) bool {
    if p[i].winN == p[j].winN {
        return p[i].name < p[j].name
    }

    return p[i].winN > p[j].winN
}

func (people byWinNum) Len() int {
    return len(people)
}

func mapSlice(m map[string]int) []personT {
    peopleSlice := make([]personT, len(m))
    i := 0
    for key, val := range m {
        peopleSlice[i].name = key
        peopleSlice[i].winN = val
        i++
    }
    return peopleSlice
}

func NthRank(st string, we []int, n int) string {
    if len(st) == 0 {
        return "No participants"
    }

    people := nameWinNums(st, we)
    if (len(people) < n) {
        return "Not enough participants"
    }

    peopleSlice := mapSlice(people)

    sort.Sort(byWinNum(peopleSlice))
    fmt.Println(peopleSlice)

    return peopleSlice[n - 1].name
}

func main() {
	fmt.Println(
		NthRank("Addison,Jayden,Sofia,Michael,Andrew,Lily,Benjamin",
			[]int{4, 2, 1, 4, 3, 1, 2}, 4))
}
