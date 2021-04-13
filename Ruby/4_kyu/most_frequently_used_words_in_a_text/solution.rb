def m_frequent(unique_words, text_words)
  most_frequent = ''
  last_count = 0
  unique_words.each do |word|
    if text_words.count(word) >= last_count
      most_frequent = word
      last_count = text_words.count(word)
    end
  end
  most_frequent
end

def clean(string)
  cleaner = string.gsub(/[^a-zA-Z' ]/, '')
  cleanest = cleaner.gsub(/ '|' /, '')
  if cleanest.match?(/ '|' /)
    clean(cleanest)
  else
    cleanest
  end
end

def top_3_words(text)
  text = clean(text)

  return [] if text.size.zero?
  text_words = text.downcase.split
  text_words.delete("'")
  unique_words = text_words.uniq

  most_frequent = m_frequent(unique_words, text_words)

  unique_words.delete(most_frequent)
  s_most_frequent = m_frequent(unique_words, text_words)

  unique_words.delete(s_most_frequent)
  t_most_frequent = m_frequent(unique_words, text_words)

  result = [most_frequent, s_most_frequent, t_most_frequent]
  result.delete('')
  result
end

# p top_3_words("e e e e e a a a  b  c c  d d d d") == ["e", "d", "a"]
# p top_3_words("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e") == ["e", "ddd", "aa"]
p top_3_words("  '''''  ")
