=begin
      n_combos = 6 ** dice_amount

      get every possible combination
        store a variable with ROLLS nested dice_amount times
        call product on ROLLS with *variable argument
      select the subset of of those combos that sum to sum_
      count the subset.
      divide subset / n_combos
=end
ROLLS = [1, 2, 3, 4, 5, 6]

def rolldice_sum_prob(sum_, dice_amount)
  n_combos = 6 ** dice_amount
  additional_dice = []
  (dice_amount - 1).times do
    additional_dice << ROLLS
  end
  all_combos = ROLLS.product(*additional_dice)
  valid_combos = all_combos.select do |combo|
    combo.sum == sum_
  end
  (valid_combos.count).to_r / n_combos.to_r
end

p rolldice_sum_prob(11, 2) #== 0.0555555555 # or 1/18

p rolldice_sum_prob(8, 2) #==  0.13888888889# or 5/36

p rolldice_sum_prob(8, 3) #== 0.0972222222222  # or 7/72
