// Hello world! Cplayground is an online sandbox that makes it easy to try out
// code.

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <regex.h>

struct Words_t {
  int length;
  char **data;
};

struct Words_t split( char *str, const char *delim)
{
    struct Words_t words;
    words.data = (char **) malloc(50);
    words.length = 0;

    char *token;
    token = strtok( str, delim);

    int i = 0;
    while (token != NULL)
    {
        words.data[i++] = token;
        words.length++;
        token = strtok(NULL, delim);
    }

    return words;
}

int is_valid_ip (const char * addr)
{
    char *str;
    str = (char *) malloc(15);

    strcpy(str, addr);
    struct Words_t words = split(str, ".");

    regex_t regex;
    int reti = regcomp(&regex, "^[1-9]{1}[0-9]*$", REG_EXTENDED);
    if (reti)
    {
        printf( "could not compile regex\n");
        exit(1);
    }

    if (words.length != 4)
    {
        return 0;
    }

    for (int i = 0; i < words.length; i++)
    {
        // printf( "%s\n", words.data[i]);

        reti = regexec(&regex, words.data[i], 0, NULL, 0);
        if (reti != 0)
        {
            return 0;
        }

        if (atoi(words.data[i]) > 255)
        {
           return 0;
        }
    }

    free(str);
    free(words.data);
    return 1;
}

int main()
{

    int a = is_valid_ip("123.232.232.33");
    printf( "%d\n", a);

    return 0;
}
