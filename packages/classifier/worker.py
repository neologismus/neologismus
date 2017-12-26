import json

import multiprocessing
from concurrent.futures import ThreadPoolExecutor
import asyncio

import redis

from classifier import check_context


def listen():
    r = redis.StrictRedis(
        host='redis',
        port=6379,
        charset="utf-8",
        decode_responses=True
    )

    while True:
        _, message = r.brpop('neologismus:classifier:contexts', timeout=0)

        data = json.loads(message)

        # склеиваем параграфы
        context = ''.join(data['payload'])

        words = check_context(context)

        if (not words):
            continue

        r.lpush('neologismus:neologisms:words', json.dumps({
            'contextId': data['contextId'],
            'payload': words
        }))


pool = ThreadPoolExecutor(max_workers=multiprocessing.cpu_count())
loop = asyncio.get_event_loop()
loop.run_in_executor(pool, listen)
loop.close()
