__author__ = 'angelinaprisyazhnaya'

import json
import re
import enchant
d = enchant.Dict("ru_RU")
import pymorphy2
morph = pymorphy2.MorphAnalyzer()
from requests.utils import quote
import requests

f = open('17032017/words_8.json', 'r')
f = f.read()
parsed = json.loads(f)

lemmas = dict()
for word in parsed:
    lemma = morph.parse(word)[0].normal_form
    lemmas[lemma] = word
    #print(word + '   ' + lemma)

#print(len(lemmas))
#print(lemmas)

not_found = 'ничего не найдено'
for lemma in lemmas:
    if "-" not in lemma:
        lemma_quote = quote(lemma.encode("cp1251"))
        url = "http://search2.ruscorpora.ru/search.xml?env=alpha&mycorp=&mysent=&mysize=&mysentsize=&mydocsize=&" \
              "dpp=&spp=&spd=&text=lexgramm&mode=paper&sort=gr_tagging&lang=ru&parent1=0&level1=0&" \
              "lex1=" + lemma_quote + "&gramm1=&sem1=&flags1=&parent2=0&level2=0&min2=1&max2=1&" \
              "lex2=&gramm2=&sem2=&flags2="
        r = requests.get(url)
        content = r.text
        if not_found in content:
            #print(lemmas[lemma])
            url = "http://search2.ruscorpora.ru/search.xml?env=alpha&mycorp=&mysent=&mysize=&mysentsize=&" \
                  "mydocsize=&dpp=&spp=&spd=&text=lexform&mode=main&sort=gr_tagging&lang=ru&nodia=1&" \
                  "req=" + lemma_quote
            r = requests.get(url)
            content = r.text
            if not_found in content:
                #print(lemmas[lemma])
                url = "http://search2.ruscorpora.ru/search.xml?env=alpha&mycorp=&mysent=&mysize=&mysentsize=&" \
                      "mydocsize=&spd=&text=lexgramm&mode=main&sort=gr_tagging&lang=ru&nodia=1&parent1=0&level1=0&" \
                      "lex1=" + lemma_quote + "&gramm1=&sem1=&sem-mod1=sem&sem-mod1=sem2&flags1=&m1=&parent2=0&" \
                      "level2=0&min2=1&max2=1&lex2=&gramm2=&sem2=&sem-mod2=sem&sem-mod2=sem2&flags2=&m2="
                r = requests.get(url)
                content = r.text
                if not_found in content:
                    print(lemmas[lemma])

    else:
        #print(lemmas[lemma])
        #continue
        try:
            lemma1, lemma2 = lemma.split('-')
            lemma1 = morph.parse(lemma1)[0].normal_form
            lemma2 = morph.parse(lemma2)[0].normal_form
            lemma1_quote = quote(lemma1.encode("cp1251"))
            lemma2_quote = quote(lemma2.encode("cp1251"))
            url = "http://search2.ruscorpora.ru/search.xml?env=alpha&mycorp=&mysent=&mysize=&mysentsize=&mydocsize=&" \
                  "dpp=&spp=&spd=&text=lexgramm&mode=paper&sort=gr_tagging&lang=ru&parent1=0&level1=0&" \
                  "lex1=" + lemma1_quote + "&gramm1=&sem1=&flags1=&parent2=0&level2=0&min2=1&max2=1&" \
                  "lex2=" + lemma2_quote + "&gramm2=&sem2=&flags2=adash"
            r = requests.get(url)
            content = r.text
            if not_found in content:
                #print(lemmas[lemma])
                lemma_quote = quote(lemma.encode("cp1251"))
                url = "http://search2.ruscorpora.ru/search.xml?env=alpha&mycorp=&mysent=&mysize=&mysentsize=&" \
                    "mydocsize=&dpp=&spp=&spd=&text=lexform&mode=main&sort=gr_tagging&lang=ru&nodia=1&" \
                    "req=" + lemma_quote
                r = requests.get(url)
                content = r.text
                if not_found in content:
                    #print(lemmas[lemma])
                    url = "http://search2.ruscorpora.ru/search.xml?env=alpha&mycorp=&mysent=&mysize=&mysentsize=&" \
                          "mydocsize=&spd=&text=lexgramm&mode=main&sort=gr_tagging&lang=ru&nodia=1&parent1=0&level1=0&" \
                          "lex1=" + lemma1_quote + "&gramm1=&sem1=&sem-mod1=sem&" \
                          "sem-mod1=sem2&flags1=&m1=&parent2=0&level2=0&min2=1&max2=1&" \
                          "lex2=" + lemma2_quote + "&gramm2=&sem2=&sem-mod2=sem&sem-mod2=sem2&flags2=&m2="
                    r = requests.get(url)
                    content = r.text
                    if not_found in content:
                        print(lemmas[lemma])
        except:
            continue