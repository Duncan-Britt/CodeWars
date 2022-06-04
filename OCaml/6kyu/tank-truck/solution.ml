let tankVol (h: int) (d: int) (vt: int) =
  let h' = float_of_int h in
  let r = (float_of_int d) /. 2.0 in
  let pi = Float.pi in
  let a = acos ((r -. h') /. r) in 
  let b = pi *. r ** 2.0 in
  let rv = ((float_of_int vt) *. a) /. pi in 
  let w = (float_of_int vt) /. b in
  let tri = w *. (r ** 2.0) *. (sin a) *. (cos a) in 
  Printf.printf "h' = %f\nr = %f\npi = %f\na = %f\nrv = %f\nb = %f\nw = %f\ntri = %f\n" h' r pi a rv b w tri;
  rv -. tri