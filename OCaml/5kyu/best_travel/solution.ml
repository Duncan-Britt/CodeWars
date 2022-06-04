let compare a b = if a < b then 1 else if a = b then 0 else -1

let chooseBestSum(t: int) (k: int) (ls: int list): int = 
  let sorted_ls = List.sort compare ls in
  let rec f acc count = function
    | [] -> -1
    | x :: xs -> 
      if count = k then 
        (* let () = print_endline (string_of_int (acc + x)) in *)
        if acc + x <= t then acc + x
        else f acc count xs
      else 
        let r = f (acc + x) (count + 1) xs in
        if r <= t && r != -1 then r
        else match xs with
        | [] -> -1
        | h :: tail -> f (acc + h) (count + 1) tail
  in f 0 1 sorted_ls

chooseBestSum 230 3 [91; 74; 73; 85; 73; 81; 87]

t = 230
k = 3

acc count list                        
0   1     [91; 87; 85; 81; 74; 73; 73]
91  2     [87; 85; 81; 74; 73; 73]
178 3     [85; 81; 74; 73; 73]
178 3     [81; 74; 73; 73]
178 3     [74; 73; 73]
178 3     [73; 73]
178 3     [73]
178 3     [] -> -1
176 3     [81; 74; 73; 73]
176 3     [74; 73; 73]
176 3     [73; 73]
176 3     [73]
176 3     [] -> -1