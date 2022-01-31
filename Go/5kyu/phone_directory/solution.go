package main

// backup of phone book as text
// line: phone number < name > address
// phone number format: +X-abc-def-ghij
//                     (where X = 1 or two digits)
//
// not always in the same order,
//
// non-alphanumberic characters can be found in address
//
// "/+1-541-754-3010 156 Alphand_St. <J Steeve>\n"
//
// " 133, Green, Rd. <E Kustur> NY-56423 ;+1-541-914-3010!\n"
//
// "<Anastasia> +48-421-674-8974 Via Quirinal Roma\n"
//
// input
// - lines of phone book "string"
// - a single phone number "string"
//
// Output
// - string
//
// s = "/+1-541-754-3010 156 Alphand_St. <J Steeve>\n 133, Green, Rd. <E Kustur> NY-56423 ;+1-541-914-3010!\n"
//
// phone(s, "1-541-754-3010") should return "Phone => 1-541-754-3010, Name => J Steeve, Address => 156 Alphand St."
//
// Edge
// - multiple people for a phone number -> return "Error => Too many people: num"
// - num not in book -> return "Error => Not found: num"

import (
    "fmt"
    "strings"
    "regexp"
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

func lex(line string) (string, string, string) {
    dup := line

    var phoneNumber string
    var name string
    var address string

    var token string
    token, dup = strTok(dup, []string{"<", "+"})
    address = token
    for len(dup) != 0 {
        if dup[0] == '<' {
            name, dup = strTok(dup, []string{">"})
        } else {
            phoneNumber, dup = strTok(dup, []string{" ", "\n"})
        }

        token, dup = strTok(dup, []string{"<", "+"})
        address += token
    }

    phoneNumber = cleanPhone(phoneNumber[1:])
    name = strings.TrimSpace(name[1:])
    address = cleanAddress(address)

    return phoneNumber, name, address
}

func cleanAddress(address string) string {
    r, _ := regexp.Compile("[^a-zA-Z0-9_. \\-]")
    address = r.ReplaceAllString(address, "")

    r, _ = regexp.Compile("[_]")
    address = r.ReplaceAllString(address, " ")

    r, _ = regexp.Compile(" {2,}")
    address = r.ReplaceAllString(address, " ")

    return strings.TrimSpace(address)
}

func cleanPhone(phoneNumber string) string {
    r, _ := regexp.Compile("([0-9]|-)+")

    return r.FindString(phoneNumber)
}

func parseLine(line string, dictP *map[string]string) {
    phoneNumber, name, address := lex(line)

    if (*dictP)[phoneNumber] != "" {
        (*dictP)[phoneNumber] = fmt.Sprintf("Error => Too many people: ")
    } else {
        (*dictP)[phoneNumber] = fmt.Sprintf(
            "Phone => %s, Name => %s, Address => %s", phoneNumber, name, address)
    }
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

func Phone(dir, num string) string {
    lines := strings.Split(dir, "\n")
    lines = filter(lines)
    dict := make(map[string]string)

    for _, line := range lines {
        parseLine(line, &dict)
    }

    if dict[num] != "" {
        if dict[num] == "Error => Too many people: " {
            return dict[num] + num
        } else {
            return dict[num]
        }
    } else {
        return "Error => Not found: " + num
    }
}

func main() {
    var dr = "/+1-541-754-3010 156 Alphand_St. <J Steeve>\n 133, Green, Rd. <E Kustur> NY-56423 ;+1-541-914-3010\n" + "+1-541-984-3012 <P Reed> /PO Box 530; Pollocksville, NC-28573\n :+1-321-512-2222 <Paul Dive> Sequoia Alley PQ-67209\n" + "+1-741-984-3090 <Peter Reedgrave> _Chicago\n :+1-921-333-2222 <Anna Stevens> Haramburu_Street AA-67209\n" + "+1-111-544-8973 <Peter Pan> LA\n +1-921-512-2222 <Wilfrid Stevens> Wild Street AA-67209\n" + "<Peter Gone> LA ?+1-121-544-8974 \n <R Steell> Quora Street AB-47209 +1-481-512-2222\n" + "<Arthur Clarke> San Antonio $+1-121-504-8974 TT-45120\n <Ray Chandler> Teliman Pk. !+1-681-512-2222! AB-47209,\n" + "<Sophia Loren> +1-421-674-8974 Bern TP-46017\n <Peter O'Brien> High Street +1-908-512-2222; CC-47209\n" + "<Anastasia> +48-421-674-8974 Via Quirinal    Roma\n <P Salinger> Main Street, +1-098-512-2222, Denver\n" + "<C Powel> *+19-421-674-8974 Chateau des Fosses Strasbourg F-68000\n <Bernard Deltheil> +1-498-512-2222; Mount Av.  Eldorado\n" + "+1-099-500-8000 <Peter Crush> Labrador Bd.\n +1-931-512-4855 <William Saurin> Bison Street CQ-23071\n" + "<P Salinge> Main Street, +1-098-512-2222, Denve\n" + "<P Salinge> Main Street, +1-098-512-2222, Denve\n"

    fmt.Println(Phone(dr, "48-421-674-8974"))
}
