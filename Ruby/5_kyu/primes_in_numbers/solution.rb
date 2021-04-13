def is_prime?(n)
  (2..n-1).all? do |f|
    n % f != 0
  end
end

def format_factors(factors)
  primes = factors.uniq
  frequency = {}
  primes.each do |prime|
    frequency[prime] = factors.count(prime)
  end
  result = ''
  frequency.each do |k, v|
    if v == 1
      result << sprintf("(%d)", k)
    else
      result << sprintf("(%d**%d)", k, v)
    end
  end
  result
end

def prime_factors(n, factors=[])
  return format_factors(factors << n) if is_prime?(n)
  f = 1
  2.upto(n) do |p|
    if n % p == 0 && is_prime?(p)
      f = p
      break
    end
  end
  factors << f
  n = n / f
  prime_factors(n, factors)
end

# "(p1**n1)(p2**n2)...(pk**nk)"
p prime_factors(36)
