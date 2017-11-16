import pymorphy2
import json
import re

import redis


morph = pymorphy2.MorphAnalyzer()


r = redis.StrictRedis(host='redis', port=6379, charset="utf-8", decode_responses=True)


def tokenize(text):
    return [word for word in re.split(r'(?!\b-\b)\W', text) if word]


def is_new_word(word):
    print(word, morph.word_is_known(word))

    return not(re.search(r'[\da-zA-Z]', word) or morph.word_is_known(word))


def check_context(context):
    tokens = tokenize(context)

    new_words = [word for word in tokens if is_new_word(word)]

    print(new_words)


def listen():
    while True:
        _, message = r.brpop('neologismus:classifier:contexts', timeout=0)

        data = json.loads(decode(message, 'utf-8'))

        check_context(''.join(data['context']))


listen()
