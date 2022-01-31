package main

import (
    "fmt"
    "strings"
)

func strTok(text string, endStrs []string) (string, string) {
    max := 0

    for _, str := range endStrs {
        if len(str) > max {
            max = len(str)
        }
    }

    for i:=0; i + max <= len(text); i++ {
        for _, matchStr := range endStrs {
            if text[i:i+len(matchStr)] == matchStr {
                return text[0:i], text[i:]
            }
        }
    }

    return text, ""
}

func timeLen(bits string) int {
    timeUnit := len(bits)
    count := 1
    lastBit := rune(bits[0])

    for _, bit := range bits[1:] {
        if lastBit == bit {
            count++
        } else {
            if count < timeUnit {
                timeUnit = count
            }
            lastBit = bit
            count = 1
        }
    }

    return timeUnit
}

var BIT_DICT = map[string]string{
    "1": ".",
    "0": "",
    "111": "-",
    "000": " ",
    "0000000": "   ",
}

func trimZeros(bits string) string {
    res := make([]rune, 0, len(bits))

    start := true
    for _, chr := range []rune(bits) {
        if start {
            if chr == '0' {
                continue
            } else {
                start = false
            }
        }

        res = append(res, chr)
    }

    return string(res)
}

func DecodeBits(bits string) string {
    bits = trimZeros(bits)
    timeUnit := timeLen(bits)

    timedBits := ""
    for i := 0; i < len(bits); i += timeUnit {
        timedBits += string(bits[i])
    }

    var bit string
    if timedBits[0] == '0' {
        bit, timedBits = strTok(timedBits, []string{"1"})
    }

    bit, timedBits = strTok(timedBits, []string{"0"})
    for bit[0] != '1' {
        bit, timedBits = strTok(timedBits, []string{"0"})
    }

    morse := BIT_DICT[bit]
    for len(timedBits) != 0 {
        bit, timedBits = strTok(timedBits, []string{string(bit[0])})
        morse += BIT_DICT[bit]
    }

    return strings.TrimSpace(morse)
}

func filter(lines []string) []string{
    res := make([]string, 0, cap(lines))
    for _, line := range lines {
        if len(line) != 0 {
            res = append(res, line)
        }
    }
    return res
}

func translate(word string) string {
  chrs := filter(strings.Split(word, " "))
  var resLetters string
  for _, chr := range chrs {
      resLetters += MORSE_CODE[chr]
  }
  return resLetters
}

func DecodeMorse(morseCode string) string {
    words := filter(strings.Split(morseCode, "   "))
    resWords := make([]string, len(words))

    for i, word := range words {
        resWords[i] = translate(word)
    }

    return strings.Join(resWords, " ")
}

func main() {
    bits := "1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011"

    // bits := "101010100010001110101110111000"

    // bits := "11101111110111"

    // bits := "01110"

    fmt.Println(DecodeBits(bits))
}
