let greatest n = 
  if n <= 4 then n 
  else 
    if n mod 2 = 0 then (n / 2) * (n / 2)
    else (n / 2) * (n / 2 + 1)

let range n = greatest n - 1

let count n = if n <= 4 then n else n / 2 - 1 + n

let midex n = (count n) / 2 + 1

let prodi n i =
  if i <= n then i 
  else let x = n - (1 + i - n) in x * (n - x)

let sum n = 
  let rec f acc i = 
    if i = n then acc + n 
    else f (acc + (prodi n i)) (i + 1) in
  let rec g acc i = 
    if i > (count n) then acc
    else if i = (count n) then acc + (prodi n i)
    else g (acc + (prodi n i)) (i + 1) in
  f 0 1 + g 0 (n + 1)

let avg n = (float_of_int (sum n)) /. (float_of_int (count n))

let median n = 
  if (count n) mod 2 = 1 then float_of_int (prodi n (midex n))
  else (float_of_int (prodi n (midex n) + prodi n ((midex n) - 1))) /. 2.0

let part n =
  Printf.sprintf "Range: %d Average: %.2f Median: %.2f" (range n) (avg n) (median n)