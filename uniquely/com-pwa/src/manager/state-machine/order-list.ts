import {FiniteStateMachine} from '@alwatr/fsm';

import {orderStorageContextConsumer, topAppBarContextProvider} from '../context.js';
import {logger} from '../logger.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Order} from '@alwatr/type/src/customer-order-management.js';

export const pageOrderListFsm = new FiniteStateMachine({
  id: 'page-order-list',
  initial: 'unresolved',
  context: {
    orderStorage: <AlwatrDocumentStorage<Order> | null> null,
  },
  states: {
    $all: {
      on: {
        CONNECTED: '$self',
      },
    },
    unresolved: {
      on: {
        IMPORT: 'resolving',
      },
    },
    resolving: {
      on: {
        CONNECTED: 'loading',
        LOADED: 'list',
      },
    },
    loading: {
      on: {
        LOADED: 'list',
      },
    },
    list: {
      on: {
        REQUEST_UPDATE: 'loading',
      },
    },
  },
} as const);

pageOrderListFsm.signal.subscribe(async (state) => {
  logger.logMethodArgs('pageOrderListFsm.changed', state);
  switch (state.by) {
    case 'IMPORT':
      // just in unresolved
      topAppBarContextProvider.setValue({
        headlineKey: 'loading',
      });
      if (orderStorageContextConsumer.getValue() == null) {
        orderStorageContextConsumer.request(null, {debounce: 'Timeout'});
        pageOrderListFsm.transition('LOADED', {orderStorage: await orderStorageContextConsumer.untilChange()});
      }
      break;

    case 'CONNECTED':
      topAppBarContextProvider.setValue({
        headlineKey: 'page_order_list_headline',
      });
      break;

    case 'REQUEST_UPDATE':
      orderStorageContextConsumer.request(null, {debounce: 'Timeout'});
      pageOrderListFsm.transition('LOADED', {orderStorage: await orderStorageContextConsumer.untilChange()});
      break;
  }
});
