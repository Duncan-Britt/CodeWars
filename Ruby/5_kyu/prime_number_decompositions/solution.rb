=begin
      Input: integer.
      Output: array of prime decomposition by ascending factors
                    If a factor appears multiple times in the
                    decomposition it should appear as many times
                    in the array


=end

require 'benchmark'

# def is_prime?(n)
#   return false if n <= 1
#   (2..n-1).none? do |num|
#     n % num == 0
#   end
# end
#
# def primes_upto(n)
#   (2..n).select do |n|
#     is_prime?(n)
#   end
# end

def sieve_of_eratosthenes(n)
  prime = []
  i = 0
  while i <= n
    prime[i] = true
    i += 1
  end

  p = 2
  while p * p <= n
    if prime[p] == true
      i = p * p
      while i <= n
        prime[i] = false
        i += p
      end
    end
    p += 1
  end

  result = []
  i = 2
  while i <= n
    result << i if prime[i]
    i += 1
  end
  result
end

def getAllPrimeFactors(n)
  if n.class != Integer
    n = 0
  end
  return [1] if n == 1
  factors = []
  primes = sieve_of_eratosthenes(n)
  i = 0
  loop do
    break if i == primes.size
    if n % primes[i] == 0
      factors << primes[i]
      n /= primes[i]
      i = 0
      next
    end
    i += 1
  end
  factors
end

def getUniquePrimeFactorsWithCount(n)
  if n.class != Integer
    n = 0
  end
  return [[], []] if n <= 0
  return [[1], [1]] if n == 1
  factors = getAllPrimeFactors(n)
  last_one = 0
  primes_factors = []
  counts = []
  this_count = 1
  factors.each do |f|
    if f != last_one
      primes_factors << f
      if last_one != 0
        counts << this_count
      end
      this_count = 1
      last_one = f
    else
      this_count += 1
    end
  end
  counts << this_count
  [primes_factors, counts]
end

def getUniquePrimeFactorsWithProducts(n)
  if n.class != Integer
    n = 0
  end
  arr = getUniquePrimeFactorsWithCount(n)
  i = 0
  result = []
  loop do
    break if i == arr[0].size
    result << arr[0][i] ** arr[1][i]
    i += 1
  end
  result
end

# p is_prime?(2) == true
# p is_prime?(5) == true
# p is_prime?(6) == false
#
# p primes_upto(75)
p sieve_of_eratosthenes(75)

# p getAllPrimeFactors(100) == [2,2,5,5]
# p getUniquePrimeFactorsWithCount(100) == [[2,5],[2,2]]
# p getUniquePrimeFactorsWithProducts(100) == [4,25]
#
# p getAllPrimeFactors('2')
# p getUniquePrimeFactorsWithCount('2')
# p getUniquePrimeFactorsWithProducts('2')

# puts Benchmark.measure {
#   p getAllPrimeFactors(100_000)
# }
