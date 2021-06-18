
def separate_liquids(glass)
  return glass if glass.empty?
  hash = {
    'O' => [],
    'A' => [],
    'W' => [],
    'H' => []
  }
  glass.each do |row|
    row.each do |e|
      hash[e] << e
    end
  end

  result = []
  row_size = glass[0].size
  i = 0
  temp = []

  hash.each do |_, arr|
    arr.each do |e|
      if i < row_size - 1
        temp << e
        i += 1
      else
        temp << e
        result << temp
        temp = []
        i = 0
      end
    end
  end
  result
end
