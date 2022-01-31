package kata

import (
    "strings"
)

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
