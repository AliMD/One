import {customElement, AlwatrSmartElement, css, html, unsafeHTML, map, state, nothing} from '@alwatr/element';

import {productStorageContextConsumer, orderStorageContextConsumer, homePageContentContextConsumer} from './context.js';

import type {BoxType, PageHomeContent} from './type.js';

import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';
import './app-footer';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-home': AlwatrPageHome;
  }
}

/**
 * Alwatr Customer Order Management Home Page
 */
@customElement('alwatr-page-home')
export class AlwatrPageHome extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
    }

    main {
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      gap: var(--sys-spacing-track);
    }

    alwatr-icon-box {
      width: 40%;
      flex-grow: 1;
    }

    alwatr-icon-box[wide]{
      width: 100%;
    }
  `;

  @state() content?: PageHomeContent;

  override connectedCallback(): void {
    super.connectedCallback();

    this._signalListenerList.push(
        homePageContentContextConsumer.subscribe((content) => {
          this.content = content;
        }),
    );

    productStorageContextConsumer.subscribe((value) => {
      this._logger.logProperty(productStorageContextConsumer.id, value);
    });

    orderStorageContextConsumer.subscribe((value) => {
      this._logger.logProperty(orderStorageContextConsumer.id, value);
    });
  }

  override render(): unknown {
    this._logger.logMethod('render');
    if (this.content == null) return nothing;
    return html`
      <alwatr-top-app-bar .content=${this.content.topAppBar}></alwatr-top-app-bar>
      <main>${map(this.content.boxList, this._boxTemplate)}</main>
      <alwatr-app-footer></alwatr-app-footer>
    `;
  }

  protected _boxTemplate(box: BoxType): unknown {
    const slot = box.slot == null ? nothing : unsafeHTML(box.slot);
    return html`<alwatr-icon-box .content=${box} ?wide=${box.wide} ?small=${box.small}>${slot}</alwatr-icon-box>`;
  }
}
