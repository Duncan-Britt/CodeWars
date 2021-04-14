=begin
      the calling object for an 'operation' like 'times' or 'plus' is
      the first operand. the return value of that must be passed to
      the next method call. a method call of a number must either provide
      the named number, or the result of the calculation
      depending on whether its called on a new Calc object, or
      something else

      That something else could be a proc object returned by 'plus' or
      'divided_by'

      initialize calc object
      def number method to return named integer if calling object
      is calc object, or to peform operation of calling object is
      proc.
=end

class Calc
  def zero
    0
  end

  def one
    1
  end

  def two
    2
  end

  def three
    3
  end

  def four
    4
  end

  def five
    5
  end

  def six
    6
  end

  def seven
    7
  end

  def eight
    8
  end

  def nine
    9
  end
end

class Integer
  def plus
    ->(arg) { self + arg }
  end

  def minus
    ->(arg) { self - arg }
  end

  def times
    ->(arg) { self * arg }
  end

  def divided_by
    ->(arg) { self / arg }
  end
end

class Proc
  def zero
    self.(0)
  end

  def one
    self.(1)
  end

  def two
    self.(2)
  end

  def three
    self.(3)
  end

  def four
    self.(4)
  end

  def five
    self.(5)
  end

  def six
    self.(6)
  end

  def seven
    self.(7)
  end

  def eight
    self.(8)
  end

  def nine
    self.(9)
  end
end

# shorter syntax found on codewars:
# class Calc
#   { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 }.each do |m, n|
#     define_method("#{m}") { @proc ? @proc.call(n) : (@number ||= n ; self ) }
#   end
#
#   { plus: :+, minus: :-, times: :*, divided_by: :/ }.each do |m, o|
#     define_method("#{m}") { @proc ||= lambda { |a| @number.send(o, a) }; self }
#   end
# end

p Calc.new.four.plus.five
p Calc.new.four.plus.five == 9
p Calc.new.five.plus.four == 9
