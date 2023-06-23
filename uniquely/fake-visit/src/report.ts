import {serviceRequest} from '@alwatr/fetch';

import {config, logger} from './config.js';
import {storageClient} from './lib/storage.js';

import type {Count} from './type.js';

export async function notify(count: number): Promise<void> {
  if (count % config.crawl.notifyCount === 0) {
    try {
      const message = makeMessage(count);
      await serviceRequest({
        method: 'POST',
        url: config.notifier.url,
        token: config.notifier.token,
        bodyJson: {
          to: config.notifier.to,
          message,
        },
      });
    }
    catch (err) {
      logger.error?.('notify', 'notify_failed', err);
    }
  }
}

export async function incrementCount(): Promise<number> {
  let count;
  count = await storageClient.get('count');
  if (count == null) {
    count = <Count>{id: 'count', value: 0};
  }
  count.value++;
  await storageClient.set(count);
  return count.value;
}

function makeMessage(count: number): string {
  return `تعداد بازدیدها از سایت ${config.crawl.home} به تعداد ${count} رسید. 🎉😎`;
}
