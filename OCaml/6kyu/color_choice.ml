let factorial n =
  let rec f acc = function 0 -> acc * 1 | x -> f (acc * x) (x - 1) in
  f 1 n

let choose n k =
  if n = k then 1 else
  let dif = n - k in
  let mn = min dif k in
  let mx = max dif k in

  let rec f acc k n = if n = k then acc * n else f (acc * n) k (n - 1) in

  (f 1 (mx + 1) n) / (factorial mn)

  let checkchoose (m: int) (n: int): int =
    let rec f x = if x > n then -1 else if (choose n x) = m then x else f (x + 1) in
    f 1

open Num

let zero = num_of_int 0
let one = num_of_int 1

let factorial n =
  let rec f acc x =
    if x =/ zero then acc */ one
    else f (acc */ x) (x -/ one) in
  f one n

let choose n k =
  if n =/ k then one else
  let dif = n -/ k in
  let mn = min_num dif k in
  let mx = max_num dif k in

  let rec f acc k n = if n =/ k then acc */ n else f (acc */ n) k (n -/ one) in

  (f one (mx +/ one) n) // (factorial mn)
  
let checkchoose (m: int) (n: int): int =
  let posters = num_of_int m in
  let colors = num_of_int n in
  let rec f x = if x >/ colors then -1 else if (choose colors x) =/ posters then int_of_num x else f (x +/ one) in
  f one

let a = num_of_int 50 in
let b = num_of_int 20 in
choose a b;;
