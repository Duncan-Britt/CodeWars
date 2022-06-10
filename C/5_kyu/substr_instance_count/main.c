#include <stdio.h>
#include <stdbool.h>
#include <string.h>

int search_substr_allow_overlap(const char* full_text, const char* search_text)
{
    size_t search_size = strlen(search_text);
    if (search_size == 0) return 0;

    size_t full_size = strlen(full_text);
    int count = 0;
    for (size_t fdx = 0; fdx < full_size; ++fdx)
    {
        if (full_text[fdx] == search_text[0])
        {
            size_t idx = fdx;
            size_t sdx = 0;
            while (sdx < search_size && full_text[idx] == search_text[sdx])
            {
                if (sdx == search_size - 1) 
                    ++count;

                ++idx;
                ++sdx;
            }
        }
    }

    return count;
}

int search_substr(const char* full_text, const char* search_text, bool allow_overlap) 
{
    size_t search_size = strlen(search_text);
    if (search_size == 0) return 0;
    if (allow_overlap) return search_substr_allow_overlap(full_text, search_text);
    
    size_t full_size = strlen(full_text);
    int count = 0;
    for (size_t fdx = 0; fdx < full_size; ++fdx)
    {
        if (full_text[fdx] == search_text[0])
        {
            size_t idx = fdx;
            size_t sdx = 0;
            while (sdx < search_size && full_text[idx] == search_text[sdx])
            {
                if (sdx == search_size - 1)
                {
                    ++count;
                    fdx += search_size - 1;
                }

                ++idx;
                ++sdx;
            }
        }
    }

    return count;
}

int main()
{
    printf("%d\n", search_substr("abcabcabc", "abc", false)); // == 3);
    printf("%d\n", search_substr("abcabcabc", "abc", true)); // == 3);
    printf("%d\n", search_substr("ababa_ababa_ababa", "aba", false)); // == 3);
    printf("%d\n", search_substr("ababa_ababa_ababa", "aba", true)); // == 6);
    printf("%d\n", search_substr("cbbdeacdecdeacdabebdbaccbaabacdeababdceebceebceddcdbcabddbbaeecbbedbdebacabaeaacaddcbedbbebceadcebddbbaabbcaddedbadeebacaebbeaaedbebcedbcbdceddcdbcecceebaddcdcbbdeecdabbadaabeacbabbbdebbceebcbebcdbeeceacadccdacbdaedcacdcecaadcecdaeecebbdebddcceccdeebbadbbdaaadcaaabbdececbbbcaaaaadbcbadbaacbdebdaebbccaaaccdccdeabcdbceeddabebbbaecebdedcbbbaedadcabecaccaaedbabaaadacccaaabaddaaebcdceaeceadcdbeabecaddbdedeedbabddaabaccccbaaaaeedeedcdeaeddaeceeceaeddbceddaecbedbebbdbadcacebebcebacededdeeacaaaebbeddcabcbcbeacccaccbcccdeeaaaebdaeeebadeceeeebeeabaeeccddedadcbabaaaadeeaaeecdaebcecbdbbdbcdddbcabeababdbaeaaeecdaeebcbbeabeacdaacccddcbbcbbbcacaabdceedbaadadaadccbdaebeacaedceabcccddeedebdabbebecddacadeadeedaececcadcaebadeeeeeceeeaeaceebeecebcbbcebecdcddbeeaeabbabdbbbbceadddaacdebcbaceebeababdeecaddecadcdacddebcadecdabaeecedddabbeadeceeccabacdecaeeeeaddcdcaaaeedebcdcecccdcbcbdbacadceccdccadeadadbceecceeabaaecdbacccacccdcddaddeddaaceeeceebdeeeccdcecbeaadcadbdbbdaceebaeeeaeacbaecddcddcadaececcbacbdecddccacabbceebeedbdbaccdedadbdaadaaabcacdadabcbcdedbdabaadacdaccbcceeabacbcdddcdaabaceaacdcbdbdbbcacedebebaeceaecbbebebacdbacbedebcdacabacdeddaabccebdadedabaebbddbdcdbdcecbedbbcdcdccdbdaeacabaacaadbdadcbccdaeddeacedaacacebccbcceacbdeddedddbbaeeeeebccddaccbbbccdecaeaeceeacbebdbdeaaadacdebebaaccababababdccaadabdabececbcdacdceabbbbccedbcadcaedabcecbbebbbcaccbbbaddebbdbebddeabdadbbeceaeeacbbddbdcabbbceccaceaccbacdeeaeeecceaeeeeaaccbeedeadbdbcccbdccabecaebeecbbaaabeaaaeeacbeeeebcecdeeacababecbeddababacdbddccbbebadaaadbcecedcadebacbecec", "dbe", false));// should return 6, actual: 5
    printf("%d\n", search_substr("cdebacdbaeadacacebcacdebdcceacaeaeacdbdacbbcddbeaabedaabadcacdbcedaaeaadbdabcbccbabbdeedeeabcdadbcdddbbbbeddccabdecdaededdacdcaeabedebeaaeeeebaecacceabcadeabbebebbdcceecaddbbcbbbdadceaaaadbbedcabbdccccdcbeeccccecedcaaeadaabacddcabbaedbaedcdcbacbcebdebeedbebebdcadddbddbcbeaebbbaeaebbbeeacddcbddeeeaebecaabbdaddccbaaceabebdcebeabeecdceddceaacccacdcbaabbdddccaadaeecdecaddacaecaebdcdeaeaabebbabceaaaccecebaabaaededaeccaadbddcaeecabbbbaebcabecbdcbdbadbebbeabbeabcdedadecbccdeaccddddbcbcdbaeaccdabbaadcdabdecaecacdbeedcbaedcbbcdacadbdaddccdbeddebeeedcbcadbccbeebecbecedeebbceadabebdaaeabdcccdadabeacdebecdbdddeeeaeaebdcdbbbbeeadecddedbebbaecebcbdbcbabededcdddccbddbbaeeabbecbcaeadcddacbadbdcabceaaebeecdabedbaaccacaedacbacbbecdabaeceedbadebdbaddacdacbaedeaaeaeecbebeccebaedaeddecdbdbcdacebdabcbcddeccaecaabedadddbbaadabaadbceacebccdbbedeadcdecbaadeabececeeeddaccdbaeeabaebebdbbbabdbdcdedeacecbadcbacdabbbeeebdaebdaaeebdbaaebaeddecbbaaeaeedcbcaecddeeeaeebcebbccabebbddccbcddeadcdcdecedecccaceaadbdebadcccdecbdcaccedaaaacaecbbceedbecaeeaadbdcdcbdbedbbbeaaabebcdedaaebaebedacacaddbcecbbedeaebdbeabeddabeacedbebeadaeebaeabedeaccddcdbedbdceedbabbacbbdcdebbadaedbcecdcdbbdabbcecccaaaddbbbdcddaecebadcbbcdadaecebdedbebecabaaeaeddeeaccccccccabaacebdccaceaedcddbecddcdaeacbcaccedacadeaccbceaacbabaceadbaaecedceebecdbbadaedccbcadbbeacbcdddcccbbbaeddbbdabaeeabdbcedaaaaadcacadecceaacaaabcbddebbaadacaddddaadbdacdabbcbcbaacedaaddcddabdadeaaeaeecbacecaeecedcbdcabbdebadcbabdebbcbacbadcaeccababedeeeeecabdecbcadeeebcdbcbeceeadebeddacdbdeeedbeeaabceceadeeeeedbbeebbeabbbbbcabcbcecbbcaadeeeacaedccaeebaacccaeacacbbbbbecdeccebbdebcaeeadbeecadaeebbcaaaabecddadeddeccbdeacdccdeccabecdbedaebbcabaeedacecbecddbccbedaeebceadcdaeabadbeebaeaaebadebbeacdddadbdecbacbedbcdccabdaeebcacedcceaaebcacbedeaaecccaccedbbdaceeedeaedcccbbacdcecbbcaaddbbbddaccaeeaceeeaabedddcbeebaeedaacddbcdaeaededabbebeddceededcadaeddadddcbccadceedcbbbddcccbeebed", "eea", false));// should return 17, actual: 12
    printf("%d\n", search_substr("eeea", "eea", false)); // 1
}

// search_substr('aa_bb_cc_dd_bb_e', 'bb')     // should return 2 since bb shows up twice
// search_substr('aaabbbcccc', 'bbb')          // should return 1
// search_substr( 'aaa', 'aa' )                // should return 2
// search_substr( 'aaa', '' )                  // should return 0
// search_substr( 'aaa', 'aa', False )         // should return 1