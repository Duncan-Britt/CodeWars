class Sudoku
  def initialize(data)
    @data = data
  end
  def valid?
    begin
      return false unless check?(@data) && check?(@data.transpose) && check?(boxes)
    rescue IndexError
      return false
    end
    true
  end

  private

  def check?(lines)
    lines.all? do |line|
      (1..line.size).all? { |n| line.count(n) == 1 }
    end
  end

  def boxes
    box_length = Math.sqrt(@data[0].size).to_i
    box_num = @data.size
    the_boxes = []
    i = 0
    j = 0
    box_num.times do
      arr = []
      while i < box_length
        while j < box_length
          arr << @data[i][j]
          j += 1
        end
        j = 0
        i += 1
      end
      the_boxes << arr
      i += 1
      j += 1
    end

    the_boxes
  end
end
