=begin
  Express u(n) as a function of n, u[n - 1], u[n - 2]. (not tested).
=end

# u(n) = u(n - u(n-1)) + u(n - u(n-2))

# SUBOPTIMAL SOLUTION:
# def u(n)
#   return 1 if n <= 2
#   u(n - u(n - 1)) + u(n - u(n - 2))
# end

# def length_sup_u_k(n, k)
#   arr = (1..n).select do |i|
#     u(i) >= k
#   end
#   arr.count
# end

# GOOD SOLUTION:

# def u(n, sequence=[1,1], idx=2)
#   return sequence if n <= 2
#   x = sequence[idx-1]
#   y = sequence[idx-2]
#   a = sequence[idx-x]
#   b = sequence[idx-y]
#   sequence[idx] = a + b
#   u(n-1, sequence, idx+1)
# end

# BEST SOLUTION

def u(n)
  sequence = [1,1]
  idx = 2
  until n <= 2
    x = sequence[idx-1]
    y = sequence[idx-2]
    a = sequence[idx-x]
    b = sequence[idx-y]
    sequence[idx] = a + b
    n -= 1
    idx += 1
  end
  sequence
end

def length_sup_u_k(n, k)
  u(n).select { |i| i >= k }.count
end

def comp(n)
  arr = u(n)
  arr.select.with_index { |e, i| e < arr[i-1] }.count - 1
end

p length_sup_u_k(23, 12) == 4
p length_sup_u_k(50, 10) == 35
p length_sup_u_k(500, 100) == 304
p comp(21361) == 10581
p u(10_000).last
