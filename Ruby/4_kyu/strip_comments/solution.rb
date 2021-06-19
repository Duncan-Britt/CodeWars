def solution(input, markers)
  lines = input.split("\n")
  clean_lines = []
  lines.each do |line|
    temp = ""
    line.each_char do |chr|
      break if markers.include?(chr)
      temp << chr
    end
    clean_lines << temp.rstrip
  end

  clean_lines.join("\n")
end
