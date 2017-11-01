__author__ = 'angelinaprisyazhnaya'

import re
from requests import Session
import json
import pymorphy2
morph = pymorphy2.MorphAnalyzer()

#words = []
#f = open('17032017/words_7.txt', 'r')
#for line in f:
    #words.append(line.replace('\n', ''))
f = open('17032017/words_8.json', 'r')
f = f.read()
words = json.loads(f)

lemmas_without_dash = dict()
lemmas_with_dash = dict()

for word in words:
    lemma = morph.parse(word)[0].normal_form
    if '-' not in word:
        lemmas_without_dash[lemma] = word
    else:
        lemmas_with_dash[lemma] = word


regex = re.compile('text-matches">\s*<strong>(\d+)</strong>')


def getAuthSession(loginData):
    loginURL = 'https://dlib.eastview.com/processlogin'

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    s = Session()

    s.post(loginURL, data=loginData, headers=headers)

    return s


def search_without_dash(term):
    url = 'https://dlib.eastview.com/search/simple/articles?do_search_within=0&' \
      'searchForOriginal=' + term + '&' \
      '_isTranslite=on&predefined=0&' \
      'fromDay=1&fromMonth=0&fromYear=2000&' \
      'toDay=1&toMonth=0&toYear=2016&' \
      'dateRangeType=range&rangeType=all&' \
      'udbIds=10&_udbIds=on&udbIds=293&_udbIds=on&udbIds=890&_udbIds=on&udbIds=8&' \
      '_udbIds=on&udbIds=6&_udbIds=on&udbIds=450&_udbIds=on&udbIds=4&_udbIds=on&' \
      'udbIds=270&_udbIds=on&udbIds=390&_udbIds=on&udbIds=9&_udbIds=on&udbIds=5&' \
      '_udbIds=on&udbIds=2&_udbIds=on&udbIds=1&_udbIds=on&_udbIds=on&_udbIds=on&' \
      '_udbIds=on&_udbIds=on&_udbIds=on&_udbIds=on&_udbIds=on&_udbIds=on&_udbIds=on' \
      '&_udbIds=on&_udbIds=on&_udbIds=on&_udbIds=on&_udbIds=on&_udbIds=on&_udbIds=on' \
      '&_udbIds=on&_udbIds=on&show=1&search=Search&doajax=0&viewType=2'

    s = getAuthSession({'UserName': 'aprisyazhnaya94@gmail.com', 'Password': 'tJ85JnAKr54p', })

    resp = s.get(url)
    resp = resp.text
    m = regex.search(resp)
    result = m.group(1)
    return result


def search_with_dash(term1, term2):
    url = 'https://dlib.eastview.com/search/simple/articles?do_search_within=0&' \
      'searchForOriginal=%22' + term1 + '+' + term2 + '%22&' \
      '_isTranslite=on&predefined=0&' \
      'fromDay=1&fromMonth=0&fromYear=2000&' \
      'toDay=1&toMonth=0&toYear=2016&' \
      'dateRangeType=range&rangeType=all&' \
      'udbIds=10&_udbIds=on&udbIds=293&_udbIds=on&udbIds=890&_udbIds=on&udbIds=8&' \
      '_udbIds=on&udbIds=6&_udbIds=on&udbIds=450&_udbIds=on&udbIds=4&_udbIds=on&' \
      'udbIds=270&_udbIds=on&udbIds=390&_udbIds=on&udbIds=9&_udbIds=on&udbIds=5&' \
      '_udbIds=on&udbIds=2&_udbIds=on&udbIds=1&_udbIds=on&_udbIds=on&_udbIds=on&' \
      '_udbIds=on&_udbIds=on&_udbIds=on&_udbIds=on&_udbIds=on&_udbIds=on&_udbIds=on' \
      '&_udbIds=on&_udbIds=on&_udbIds=on&_udbIds=on&_udbIds=on&_udbIds=on&_udbIds=on' \
      '&_udbIds=on&_udbIds=on&show=1&search=Search&doajax=0&viewType=2'

    s = getAuthSession({'UserName': 'aprisyazhnaya94@gmail.com', 'Password': 'tJ85JnAKr54p', })

    resp = s.get(url)
    resp = resp.text
    m = regex.search(resp)
    result = m.group(1)
    return result

for lemma in lemmas_without_dash:
    word = lemmas_without_dash[lemma]
    number_of_articles = search_without_dash(word)
    if number_of_articles == '0':
        print(word)

for lemma in lemmas_with_dash:
    try:
        word1, word2 = lemmas_with_dash[lemma].split('-')
        number_of_articles = search_with_dash(word1, word2)
        if number_of_articles == '0':
            print(word1 + '-' + word2)
    except:
        pass

