package main

import (
	"fmt"
	"math"
)

const encodeStd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~\""

type Encoding struct {
	encode    [91]byte
	decodeMap [256]byte
}

func NewEncoding(encoder string) *Encoding {
    // GUARD CLAUSE
    if len(encoder) != 91 {
        panic("encoding alphabet is not 91 bytes long")
    }
    for i := 0; i < len(encoder); i++ {
        if encoder[i] == '\n' || encoder[i] == '\r' {
            panic("encoding alphabet contains newline character")
        }
    }
    // END GUARD CLAUSE

    e := new(Encoding)
    copy(e.encode[:], encoder)

    i := 0
    for ; i < len(encoder); i++ {
        e.decodeMap[encoder[i]] = byte(i)
    }
    for ; i < len(e.decodeMap); i++ {
        e.decodeMap[i] = 255
    }

    return e
}

var StdEncoding = NewEncoding(encodeStd)

func (enc *Encoding) Encode(dst, src []byte) int {
    var queue, numBits uint

    n := 0
    for i := 0; i < len(src); i++ {
        queue |= uint(src[i]) << numBits
        numBits += 8
        if numBits > 13 {
            var v uint = queue & 8191

            if v > 88 {
                queue >>= 13
                numBits -= 13
            } else {
                v = queue & 16383
                queue >>= 14
                numBits -= 14
            }
            dst[n] = enc.encode[v % 91]
            n++
            dst[n] = enc.encode[v / 91]
            n++
        }
    }

    if numBits > 0 {
        dst[n] = enc.encode[queue % 91]
        n++

        if numBits > 7 || queue > 90 {
            dst[n] = enc.encode[queue / 91]
            n++
        }
    }

    return n // maybe unnecessary
}

func (enc *Encoding) EncodedLen(n int) int {
    return int(math.Ceil(float64(n) * 16.0 / 13.0))
}

func Encode(d []byte) []byte {
    buf := make([]byte, StdEncoding.EncodedLen(len(d)))
    n := StdEncoding.Encode(buf, d)
    return buf[:n]
}

func main() {
    fmt.Printf("%s\n", Encode([]byte("Hello World!")))
}
