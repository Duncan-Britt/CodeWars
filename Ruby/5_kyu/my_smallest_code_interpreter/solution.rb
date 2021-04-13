def brain_luck(code, input)
  output = ''
  # code here
  data = input.chars
  memory_tape = []
  9_000.times do
    memory_tape << 0.chr
  end

  data_pointer = 0
  instructions = code.chars
  command = 0
  while command < instructions.length
    case instructions[command]
    when '>'
      data_pointer += 1
    when '<'
      data_pointer -= 1
    when '+'
      memory_tape[data_pointer] = ((memory_tape[data_pointer].ord + 1) % 256).chr
    when '-'
      memory_tape[data_pointer] = ((memory_tape[data_pointer].ord - 1) % 256).chr
    when '.'
      output << memory_tape[data_pointer]
    when ','
      memory_tape[data_pointer] = data.shift
    when '['
      if memory_tape[data_pointer] == 0.chr
        close_b = 0
        open_b = 0
        loop do
          close_b += 1 if instructions[command] == ']'
          open_b += 1 if instructions[command] == '['
          break if close_b == open_b
          command += 1
        end
      end
    when ']'
      if memory_tape[data_pointer] != 0.chr
        close_b = 0
        open_b = 0
        loop do
          close_b += 1 if instructions[command] == ']'
          open_b += 1 if instructions[command] == '['
          break if close_b == open_b
          command -= 1
        end
      end
    end
    command += 1
  end
  # end code
  output
end

p brain_luck(',+[-.,+]', 'Codewars' + 255.chr) == 'Codewars'

p brain_luck(',[.[-],]', 'Codewars' + 0.chr) == 'Codewars'

# Two numbers multiplier
p brain_luck(',>,<[>[->+>+<<]>>[-<<+>>]<<<-]>>.', 8.chr + 9.chr) == 72.chr
