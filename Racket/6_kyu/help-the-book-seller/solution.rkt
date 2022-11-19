#lang racket
(provide stock-list)

;; code: [Category][blah][blah]
;; [code] [int ∈ [0, ∞)]

;; (define (update cat amt cat-counts)
;;   (cond [(null? cat-counts)
;;          '()]
;;         [(equal? cat (car (car cat-counts)))
;;          (let [(cat-count (car (cdr (car cat-counts))))]
;;            (cons (list cat (+ amt cat-count))  (cdr cat-counts)))]
;;         [else
;;          (cons (car cat-counts) (update cat amt (cdr cat-counts)))]))

;; (define (stock-list books cats)
;;   (let [(cat-counts (map (λ (cat) (list cat 0)) cats))]
;;     (foldl (λ (book cat-counts)
;;              (match-let [((list code amt) (string-split book))]
;;                (update (string (car (string->list code))) (string->number amt) cat-counts)))
;;            cat-counts books)))

;; (stock-list '["ABART 20" "CDXEF 50" "BKWRK 25" "BTSQZ 89" "DRTYM 60"] '["A" "B" "C" "D"])

(define (update cat amt cat-counts)
  (cond [(null? cat-counts)
         '()]
        [(equal? cat (car (car cat-counts)))
         (let [(cat-count (cdr (car cat-counts)))]
           (cons (cons cat (+ amt cat-count))  (cdr cat-counts)))]
        [else
         (cons (car cat-counts) (update cat amt (cdr cat-counts)))]))

(define (stock-list books cats)
  (if (null? books) '()
      (let [(cat-counts (map (λ (cat) (cons cat 0)) cats))]
        (foldl (λ (book cat-counts)
                 (match-let [((list code amt) (string-split book))]
                   (update (string (car (string->list code))) (string->number amt) cat-counts)))
               cat-counts books))))

(stock-list '["ABART 20" "CDXEF 50" "BKWRK 25" "BTSQZ 89" "DRTYM 60"] '["A" "B" "C" "D"])

(map (λ(x y) (print x) (print " ") (println y)) '(1 2 3) '("A" "B" "C"))


(map cons (build-list 10 (λ(x) (expt x 2))) (build-list 10 (λ(x) (expt 2 x))))

(make-hash '((0 . 1) (1 . 2)))
(define h (make-hash '((0 . 1) (1 . 2))))
(hash-ref h 1)
