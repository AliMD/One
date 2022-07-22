import {existsSync} from 'fs';

import {alwatrRegisteredList, createLogger} from '@alwatr/logger';

import {readJsonFile, writeJsonFile} from './util.js';

import type {DocumentObject, DocumentListStorage} from './type.js';
import type {Logger} from '@alwatr/logger/type.js';

export * from './type.js';

alwatrRegisteredList.push({
  name: '@alwatr/jatabase',
  version: '{{ALWATR_VERSION}}',
});

/**
 * Elegant powerful micro in-memory document Database with disk backed.
 *
 * @example
 * import {Jatabase} from '@alwatr/jatabase';
 * const db = new Jatabase<User>('user-list');
 * await db.ready
 * const user = db.get('my-user-id', true);
 */
export class Jatabase<DocumentType extends DocumentObject> {
  isReady = false;
  readonly ready: Promise<void>;
  readonly name: string;

  protected _logger: Logger;
  protected _storage: DocumentListStorage<DocumentType> = {};
  protected _storagePath: string;

  constructor(name: string, pathPrefix = 'data/') {
    this._logger = createLogger(`jatabase:${name}`);
    this.name = name;
    this._storagePath = `${pathPrefix}/${name}.json`;
    this.ready = this._init();
  }

  private async _init(): Promise<void> {
    this._logger.logMethod('_init');
    this._storage = await readJsonFile<DocumentListStorage<DocumentType>>(this._storagePath);
    this.isReady = true;
    this._logger.logProperty('isReady', this.isReady);
  }

  /**
   * Get a document object by id.
   *
   * @param documentId The id of the document object.
   * @param fastInstance by default it will return a copy of the document.
   * if you set fastInstance to true, it will return the original document.
   * This is dangerous but much faster and you should use it only if you know what you are doing.
   */
  get(documentId: string, fastInstance?: boolean): DocumentType | null {
    this._logger.logMethodArgs('get', documentId);
    const documentObject = this._storage[documentId];
    if (documentObject == null) {
      return null;
    } else if (fastInstance) {
      return documentObject;
    } else {
      return JSON.parse(JSON.stringify(documentObject));
    }
  }

  /**
   * Insert/update a document object in the storage.
   *
   * @param documentObject The document object to insert/update contain `_id`.
   * @param fastInstance by default it will make a copy of the document before set.
   * if you set fastInstance to true, it will set the original document.
   * This is dangerous but much faster and you should use it only if you know what you are doing.
   */
  set(documentObject: DocumentType, fastInstance?: boolean): void {
    this._logger.logMethodArgs('set', documentObject._id);

    // update meta
    documentObject._updated = Date.now();
    if (documentObject._created == null) {
      documentObject._created = documentObject._updated;
    }
    if (documentObject._rev == null) {
      documentObject._rev = 0;
    } else {
      documentObject._rev++;
    }

    if (fastInstance !== true) {
      // clone
      documentObject = JSON.parse(JSON.stringify(documentObject));
    }

    this._storage[documentObject._id] = documentObject;
    this._storage._last = documentObject._id;
  }

  /**
   * Remove a document object from the storage.
   */
  remove(documentId: string): void {
    this._logger.logMethodArgs('remove', documentId);
    delete this._storage[documentId];
  }

  private _saveTimer?: NodeJS.Timeout | number;
  /**
   * Save the storage to disk.
   */
  save(): void {
    this._logger.logMethod('save');
    if (this._saveTimer != null) {
      return;
    }
    this._saveTimer = setTimeout(() => {
      this._logger.logMethod('save.timeout');
      clearTimeout(this._saveTimer);
      delete this._saveTimer;
      writeJsonFile(this._storagePath, this._storage);
    }, 100);
  }
}
