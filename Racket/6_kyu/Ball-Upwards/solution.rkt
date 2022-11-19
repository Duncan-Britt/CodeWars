#lang racket
(provide max-ball)

; v0 (km/hr)
; h = v0*t - (1/2)gt^2
; g = 9.81 (m/s^2)

; A device is recroding at every tenth of a second the height of the ball

(define (km/hr->m/s v) (/ (* v 1000) 3600))

(define (max-ball v0)
  (let* [(v0 (km/hr->m/s v0))
         (g 981/100)
         (t (/ v0 g))]
    (round (* t 10))))
    

