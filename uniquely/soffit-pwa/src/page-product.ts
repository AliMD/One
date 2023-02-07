import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';

import '@alwatr/ui-kit/button/icon-button.js';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

import type {IconButtonContent} from '@alwatr/ui-kit/button/icon-button.js';
import type {TopAppBarContent} from '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-product': AlwatrPageHome;
  }
}

const topBarContent: TopAppBarContent = {
  headline: 'بازرگانی سافیت',
  type: 'center',
  startIcon: {icon: 'arrow-back', flipRtl: true},
  endIconList: [{icon: 'menu'}, {icon: 'home'}],
};

/**
 * Soffit Product Page
*/
@customElement('alwatr-page-product')
export class AlwatrPageHome extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: auto;
    }

    main {
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      gap: calc(2 * var(--sys-spacing-track));
    }
  `;

  override render(): unknown {
    this._logger.logMethod('render');

    return html`
      <alwatr-top-app-bar .content=${topBarContent}></alwatr-top-app-bar>
      <main>
        <alwatr-icon-button .content=${<IconButtonContent>{icon: 'bulb'}}></alwatr-icon-button>
        <alwatr-icon-button .content=${<IconButtonContent>{icon: 'bulb'}}></alwatr-icon-button>
        <alwatr-icon-button .content=${<IconButtonContent>{icon: 'bulb'}} disabled></alwatr-icon-button>
      </main>
    `;
  }
}
