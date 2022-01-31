package main

import (
	"fmt"
	"regexp"
	"sort"
	"strings"
    "strconv"
)

func counts(s string) map[rune]int {
	r := regexp.MustCompile("[a-z]")
	chrCounts := make(map[rune]int)
	for i, chr := range s {

		if r.MatchString(s[i : i+1]) {
			chrCounts[chr]++
		}
	}

	return chrCounts
}

func filter(counts map[rune]int) {
	for chr, cnt := range counts {
		if cnt == 1 {
			delete(counts, chr)
		}
	}
}

type letterT struct {
	chr    rune
	count  int
	origin int
}

type letters []letterT

func (l letters) Len() int {
	return len(l)
}

func (l letters) Swap(i, j int) {
	l[i], l[j] = l[j], l[i]
}

func (l letters) Less(i, j int) bool {
    if l[i].count != l[j].count {
		return l[i].count > l[j].count
	} else if l[i].origin != l[j].origin {
        return l[i].origin < l[j].origin
    } else {
        return l[i].chr < l[j].chr
    }
}

func tuple(countsDict1, countsDict2 map[rune]int) letters {
	letters := make([]letterT, 0, len(countsDict1)+len(countsDict2))
	for chr, cnt := range countsDict1 {
        if countsDict2[chr] > cnt {
            continue
        }

		var letter letterT
		letter.chr = chr
		letter.count = cnt

        if countsDict2[chr] == cnt {
            letter.origin = 3
        } else {
            letter.origin = 1
        }

		letters = append(letters, letter)
	}

	for chr, cnt := range countsDict2 {
        if countsDict1[chr] >= cnt {
            continue
        }

		var letter letterT
		letter.chr = chr
		letter.count = cnt

        if countsDict1[chr] == cnt {
            letter.origin = 3
        } else {
            letter.origin = 2
        }

		letters = append(letters, letter)
	}

	return letters
}

func format(tuples letters) string {
	res := ""

	for i, letter := range tuples {
        var prefix string
        if letter.origin == 3 {
            prefix = "="
        } else {
            prefix = strconv.Itoa(letter.origin)
        }

		res += fmt.Sprintf(
			"%s:%s", prefix, strings.Repeat(string(letter.chr), letter.count))
		if i != len(tuples)-1 {
			res += "/"
		}

	}

	return res
}

func Mix(s1, s2 string) string {
	c1 := counts(s1)
	c2 := counts(s2)

	filter(c1)
	filter(c2)

	tup := tuple(c1, c2)
	sort.Sort(tup)

	return format(tup)
}

func main() {
	s1 := "my&friend&Paul has heavy hats! k&"
	s2 := "my friend John has many many friends &"
	fmt.Println(Mix(s1, s2))
}
