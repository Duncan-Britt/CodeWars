def score( dice )
  dice = dice.dup
  total = 0
  if dice.count(1) >= 3
    total += 1000
    remaining = dice.count(1) - 3
    i = 0
    while dice.count(1) > remaining
      if dice[i] == 1
        dice.delete_at(i)
      else
        i += 1
      end
    end
  end

  if dice.count(6) >= 3
    total += 600
    remaining = dice.count(6) - 3
    i = 0
    while dice.count(6) > remaining
      if dice[i] == 6
        dice.delete_at(i)
      else
        i += 1
      end
    end
  end

  if dice.count(5) >= 3
    total += 500
    remaining = dice.count(5) - 3
    i = 0
    while dice.count(5) > remaining
      if dice[i] == 5
        dice.delete_at(i)
      else
        i += 1
      end
    end
  end

  if dice.count(4) >= 3
    total += 400
    remaining = dice.count(4) - 3
    i = 0
    while dice.count(4) > remaining
      if dice[i] == 4
        dice.delete_at(i)
      else
        i += 1
      end
    end
  end

  if dice.count(3) >= 3
    total += 300
    remaining = dice.count(3) - 3
    i = 0
    while dice.count(3) > remaining
      if dice[i] == 3
        dice.delete_at(i)
      else
        i += 1
      end
    end
  end

  if dice.count(2) >= 3
    total += 200
    remaining = dice.count(2) - 3
    i = 0
    while dice.count(2) > remaining
      if dice[i] == 2
        dice.delete_at(i)
      else
        i += 1
      end
    end
  end

  dice.count(1).times do
    total += 100
  end

  dice.count(5).times do
    total += 50
  end

  # total += 100 if dice.count(1) == 1
  # total += 50 if dice.count(5) == 1

  total
end

# p score([1,1,1,2,3,1])

# TESTS
p score([2, 3, 4, 6, 2]) == 0
p score( [2, 2, 2, 3, 3] ) == 200
p score( [2, 4, 4, 5, 4] ) == 450
