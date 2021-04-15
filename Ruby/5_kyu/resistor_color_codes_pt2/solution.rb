=begin

=end

TRANSLATION = {
  0 => 'black',
  1 => 'brown',
  2 => 'red',
  3 => 'orange',
  4 => 'yellow',
  5 => 'green',
  6 => 'blue',
  7 => 'violet',
  8 => 'gray',
  9 => 'white'
}

def encode_resistor_colors(ohms_string)
  if ohms_string.match?(/\./)
    float = ohms_string.scan(/[0-9].[0-9]/)[0]
    arr = float.chars
    i = 0
    digits_before = []
    loop do
      break if arr[i] == "."
      digits_before << arr[i].to_i
      i += 1
    end
    digits_after = []
    loop do
      i += 1
      break if i == arr.size
      digits_after << arr[i].to_i
    end
    magnitude = ohms_string.scan(/[a-zA-Z]/).join
    power = case magnitude
    when "ohms"
      0 + digits_before.size - 2
    when "kohms"
      2 + digits_before.size - 1
    when "Mohms"
      5 + digits_before.size - 1
    end
    if digits_before.size == 1
      digits_before << 0
    end
    result = []
    result << TRANSLATION[digits_before[0]]
    result << TRANSLATION[digits_after[0]]
    result << TRANSLATION[power]
    result << "gold"
    result.join(' ')
  else
    digits = ohms_string.scan(/[0-9]/).map { |e| e.to_i }
    magnitude = ohms_string.scan(/[a-zA-Z]/).join
    power = case magnitude
    when "ohms"
      0 + digits.size - 2
    when "kohms"
      2 + digits.size - 1
    when "Mohms"
      5 + digits.size - 1
    end
    if digits.size == 1
      digits << 0
    end
    result = []
    digits.each_with_index do |n, i|
      break if i == 2
      result << TRANSLATION[n]
    end
    result << TRANSLATION[power]
    result << "gold"
    result.join(' ')
  end
end

p encode_resistor_colors("10 ohms") == "brown black black gold"
p encode_resistor_colors("47 ohms") == "yellow violet black gold"
p encode_resistor_colors("100 ohms") == "brown black brown gold"
p encode_resistor_colors("220 ohms") == "red red brown gold"
p encode_resistor_colors("330 ohms") == "orange orange brown gold"
p encode_resistor_colors("470 ohms") == "yellow violet brown gold"
p encode_resistor_colors("680 ohms") == "blue gray brown gold"
p encode_resistor_colors("1k ohms") == "brown black red gold"
p encode_resistor_colors("4.7k ohms") == "yellow violet red gold"
p encode_resistor_colors("10k ohms") == "brown black orange gold"
p encode_resistor_colors("22k ohms") == "red red orange gold"
p encode_resistor_colors("47k ohms") == "yellow violet orange gold"
p encode_resistor_colors("100k ohms") == "brown black yellow gold"
p encode_resistor_colors("330k ohms") == "orange orange yellow gold"
p encode_resistor_colors("1M ohms") == "brown black green gold"
p encode_resistor_colors("2M ohms") == "red black green gold"
