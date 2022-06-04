(define p
  (lambda (n m)
    (define d (- n m))
    (cond
      ((= m 1) 1)
      ((= d 0) (+ 1 (p n (- m 1))))
      (else (+ (p m d) (p n (- m 1)))))))

6
5 1
4 2
4 1 1
3 3
3 2 1
3 1 1 1
2 2 2
2 2 1 1
2 1 1 1 1
1 1 1 1 1 1
