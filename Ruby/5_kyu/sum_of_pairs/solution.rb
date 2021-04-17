require 'benchmark'

def sum_pairs(ints, s)
  seen = {}
  for i in ints do
    return [s-i, i] if seen[s-i]
    seen[i] = true
  end
  nil
end

time = Benchmark.realtime do
  l1= [1, 4, 8, 7, 3, 15]
  l2= [1, -2, 3, 0, -6, 1]
  l3= [20, -13, 40]
  l4= [1, 2, 3, 4, 1, 0]
  l5= [10, 5, 2, 3, 7, 5]
  l6= [4, -2, 3, 3, 4]
  l7= [0, 2, 0]
  l8= [5, 9, 13, -3]
  l9 = []
  1_000_000.times do
    l9 << rand(0..11)
  end

  p sum_pairs(l1, 8) == [1, 7]
  p sum_pairs(l2, -6) == [0, -6]
  p sum_pairs(l3, -7) == nil
  p sum_pairs(l4, 2) == [1, 1]
  p sum_pairs(l5, 10) == [3, 7]
  p sum_pairs(l6, 8) == [4, 4]
  p sum_pairs(l7, 0) == [0, 0]
  p sum_pairs(l8, 10) == [13, -3]
  p sum_pairs(l9, 5500) == nil
end
puts "%.2f" % time

# p sum_pairs(l5+l1+l2+l3+l4+l7+l6+l8, 999)
