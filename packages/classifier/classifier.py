import re
import string

import pymorphy2
import nltk
from nltk.corpus import stopwords

nltk.download('punkt')
nltk.download('stopwords')

morph = pymorphy2.MorphAnalyzer()


def split_on_uppercase(s):
    length = len(s)
    is_lower_around = (
        lambda:
            s[i - 1].islower() or s[i - 1].isdigit()
            # s[i - 1].islower() and (length > (i + 1) and s[i + 1].islower())
    )

    start = 0
    parts = []

    for i in range(1, length):
        if s[i].isupper() and is_lower_around():
            parts.append(s[start: i])
            start = i

    parts.append(s[start:])

    return parts


def tokenize(text):
    # токенизируем
    tokens = nltk.word_tokenize(text)

    # очищаем от пунктуации
    tokens = [token for token in tokens if (token not in string.punctuation)]

    # создаем Set токенов
    tokens_set = set()

    for token in tokens:
        # сплитим по не-буквам
        words = re.split(r'(?!\b-\b)\W', token)
        for word in words:
            # делим по заглавным буквам
            tokens_set.update(split_on_uppercase(word))

    tokens = tokens_set

    # удаляем стоп-слова
    stop_words = stopwords.words('russian')
    stop_words.extend([
        'что',
        'это',
        'так',
        'вот',
        'быть',
        'как',
        'в',
        '—',
        'к',
        'на'
    ])
    tokens = [token for token in tokens if (
        token != ''
        and token not in stop_words
        # удаляем слова, которые не кончаются на буквы
        # TODO: проблемы майнера?
        and re.match(r'.*[а-яА-Я]$', token)
    )]

    return tokens


def is_new_word(word):
    return not(re.match(r'[\da-zA-Z]', word) or morph.word_is_known(word))


def collect(words):
    ngrams = dict()
    n_max = 6
    n_min = 4

    for word in words:
        found = False

        for n in range(n_max, n_min - 1, -1):
            ngram = word[0:n].lower()

            if (ngram not in ngrams):
                ngrams[ngram] = set()
            else:
                found = True

            ngrams[ngram].add(word)

            if found:
                break

    ngrams_filtered = dict()

    for ngram, words in ngrams.items():
        ngram_next = ngram
        words_next = set(words)

        if len(ngram) != n_max:
            continue

        for n in range(n_max - 1, n_min - 1, -1):
            ngram_curr = ngram[0:n]

            if ngram_curr not in ngrams:
                break

            words_curr = ngrams[ngram_curr]
            if (len(words_curr) > 1):
                ngram_next = ngram_curr
                words_next.update(words_curr)

        ngrams_filtered[ngram_next] = list(words_next)

    return ngrams_filtered


def check_context(context):
    tokens = tokenize(context)

    new_words = [word for word in tokens if is_new_word(word)]

    return collect(new_words)
