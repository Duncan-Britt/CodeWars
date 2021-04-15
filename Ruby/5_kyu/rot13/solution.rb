def rot13(string)
  string.chars.map do |chr|
    if /[A-Z]/.match?(chr)
      (((chr.ord - 65) + 13) % 26 + 65).chr
    elsif /[a-z]/.match?(chr)
      (((chr.ord - 97) + 13) % 26 + 97).chr
    else
      chr
    end
  end.join
end
