=begin
  only change /[a-zA-Z]/
  two letter prefix
    first is first letter of encoded message, downcased
    second is the first, but shifted by n
    prefix does not subtract from coded message, (first letter is still used after prefix)
  if possible, split encoded message evenly into array of 5 substrings.
    if not possible to split evenly in 5 substrings, make first 4 even and the fifth one shorter

  ??? If the last part is the empty string don't put this empty string in the resulting array.  ???
  For example, if the coded message has a length of 17 the five parts will have lengths of 4, 4, 4, 4, 1. The parts 1, 2, 3, 4 are evenly split and the last part of length 1 is shorter. If the length is 16 the parts will be of lengths 4, 4, 4, 4, 0. Parts 1, 2, 3, 4 are evenly split and the fifth runner will stay at home since his part is the empty string and is not kept.

   If there are many options of how to split, choose the option where the fifth part has the longest length, provided that the previous conditions are fulfilled.
=end

def shift(char, n)
  if /[A-Z]/.match?(char)
    ((((char.ord - 65) + n) % 26) + 65).chr
  else
    ((((char.ord - 97) + n) % 26) + 97).chr
  end
end

def unshift(char, n)
  if /[A-Z]/.match?(char)
    ((((char.ord - 65) - n) % 26) + 65).chr
  else
    ((((char.ord - 97) - n) % 26) + 97).chr
  end
end

def divisible_by_5?(n)
  (n % 5).zero?
end

def split_up(str)
  result = []
  if divisible_by_5?(str.length)
    i = 0
    j = 0
    k = str.length / 5
    until i == str.length
      substr = ''
      j = 0
      while j < k
        substr << str[i]
        i += 1
        j += 1
      end
      result << substr
    end
  else
    i = 0
    j = 0
    l = better_multiple4(str.length)
    k = l / 4
    until i == l
      substr = ''
      j = 0
      while j < k
        substr << str[i]
        i += 1
        j += 1
      end
      result << substr
    end
    unless i == str.length
      substr = ''
      until i == str.length
        substr << str[i]
        i += 1
      end
      result << substr
    end
  end
  result
end

def lesser_multiple4(n)
  return n if n % 4 == 0
  lesser_multiple4(n-1)
end

def better_multiple4(n, orig=n, previous=nil)
  a = lesser_multiple4(n)
  four_length = a / 4
  five_length = orig - a
  if five_length > four_length
    return previous
  end
  better_multiple4(n-4, orig, a)
end

def encode_str(u, n)
   prefix = u[0].downcase + shift(u[0].downcase, n)
   coded = ''
   u.each_char do |chr|
     if /[a-zA-Z]/.match?(chr)
       coded << shift(chr, n)
     else
       coded << chr
     end
   end
   split_up(prefix + coded)
end

def decode(arr)
  str = arr.join
  n = get_shift(str[0..1])
  str = str[2..-1]
  decoded = ''
  str.each_char do |chr|
    if /[a-zA-Z]/.match?(chr)
      decoded << unshift(chr, n)
    else
      decoded << chr
    end
  end
  decoded
end

def get_shift(prefix)
  prefix[1].ord - prefix[0].ord
end

u = "I should have known that you would have a perfect answer for me!!!"
v = ["ijJ tipvme ibw", "f lopxo uibu z", "pv xpvme ibwf ", "b qfsgfdu botx", "fs gps nf!!!"]
# p u.length + 2
# p encode_str(u, 1) == v
# p decode(v) #== u
# p shift('Z', 1)
# p better_multiple4(68)
