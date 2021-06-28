class Array
  def same_structure_as(arr)
    return false unless arr.class == Array
    return false unless arr.size == size
    i = 0
    loop do
      break if i == size
      if self[i].class != arr[i].class
        return false if self[i].class == Array || arr[i].class == Array
      end
      if self[i].class == Array
        return false unless self[i].same_structure_as(arr[i])
      end
      i += 1
    end
    true
  end
end

# p [ 1, 1, 1 ].same_structure_as( [ 2, 2, 2 ] ) == true
# p [ 1, [ 1, 1 ] ].same_structure_as( [ 2, [ 2, 2 ] ] ) == true
# #
# p [ 1, [ 1, 1 ] ].same_structure_as( [ [ 2, 2 ], 2 ] ) == false
# p [ 1, [ 1, 1 ] ].same_structure_as( [ [ 2 ], 2 ] ) == false
# #
# p [ [ [ ], [ ] ] ].same_structure_as( [ [ [ ], [ ] ] ] ) == true
#
# p [ [ [ ], [ ] ] ].same_structure_as( [ [ 1, 1 ] ] ) == false
