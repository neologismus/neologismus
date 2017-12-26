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
        type, message = r.brpop([
            'neologismus:classifier:contexts',
            'neologismus:classifier:contexts:links',
        ], timeout=0)

        data = json.loads(message)

        # склеиваем параграфы
        context = ''.join(data['payload'])

        words = check_context(context)

        if (not words):
            continue

        print('type', type)

        if type == 'neologismus:classifier:contexts:links':
            id = data['id']
            print(id, f'neologismus:neologisms:words:{id}')
            r.lpush(f'neologismus:neologisms:words:{id}', json.dumps({
                'payload': words
            }))
        else:
            r.lpush('neologismus:neologisms:words', json.dumps({
                'contextId': data['contextId'],
                'payload': words
            }))


pool = ThreadPoolExecutor(max_workers=multiprocessing.cpu_count())
loop = asyncio.get_event_loop()
loop.run_in_executor(pool, listen)
loop.close()
