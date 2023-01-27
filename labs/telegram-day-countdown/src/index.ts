import {logger} from './config.js';
import {launchBot} from './lib/launch.js';

import './route/home.js';
import './route/notify.js';

logger.logOther('..:: Telegram Notifier ::..');

launchBot();
