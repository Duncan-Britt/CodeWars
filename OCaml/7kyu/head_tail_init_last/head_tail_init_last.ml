(*  TODO: implement the four functions specified.
    The functions work on lists. *)

let head xs = match xs with x :: _ -> x

let rec last xs = match xs with
  | [x] -> x 
  | x :: xs -> last xs

let tail xs = match xs with
  | [] -> []
  | x :: xs -> xs

let rec init xs = match xs with
  | [] -> []
  | [x] -> []
  | x :: [xn] -> [x]
  | x :: xs -> x :: init xs

let _ = print_endline "Hello world"
