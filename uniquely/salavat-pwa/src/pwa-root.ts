import {AlwatrRootElement, html, customElement, css} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';
import {router} from '@alwatr/router';

import '@alwatr/icon';
import '@alwatr/ui-kit/icon-button/standard-icon-button.js';

import './page-home.js';

import type {CSSResultGroup} from '@alwatr/element';
import type {RoutesConfig} from '@alwatr/router';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-pwa-root': AlwatrPwaRoot;
  }
}

/**
 * Alwatr PWA Root Element
 */
@customElement('alwatr-pwa-root')
export class AlwatrPwaRoot extends AlwatrRootElement {
  static override styles: CSSResultGroup = [
    AlwatrRootElement.styles,
    css`
      .page-container {
        padding-bottom: calc(4 * var(--sys-spacing-track));
        flex-grow: 0 !important;
        contain: layout style;
      }

      alwatr-standard-icon-button {
        width: calc(7 * var(--sys-spacing-track));
        height: calc(7 * var(--sys-spacing-track));
      }
    `,
    css`
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: calc(7 * var(--sys-spacing-track));

        position: fixed;
        top: 0;
        right: 0;
        left: 0;
      }

      header alwatr-standard-icon-button::part(icon) {
        width: calc(4 * var(--sys-spacing-track));
        height: calc(4 * var(--sys-spacing-track));
      }
    `,
    css`
      .main-image {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex-grow: 1;
        /* url reapet position/size */
        background: url('/images/main-image.jpg') no-repeat center/cover;
        /* top right/left bottom */
        margin: 0 calc(7 * var(--sys-spacing-track)) calc(3 * var(--sys-spacing-track));
        border-radius: 0 0 50vw 50vw;
        box-shadow: 2px 4px 50px #37474f;
        overflow: hidden;
        overflow: clip;
      }
      .main-image alwatr-standard-icon-button {
        --_surface-color-bg: var(--sys-color-primary-hsl);

        border-radius: 0;
        width: 100%;
        height: calc(9 * var(--sys-spacing-track));
        background-color: hsla(var(--_surface-color-bg), 80%);
      }
      .main-image alwatr-standard-icon-button::part(icon) {
        width: calc(5 * var(--sys-spacing-track));
        height: calc(5 * var(--sys-spacing-track));
      }
    `,
    css`
      footer {
        display: flex;
        direction: ltr;
        align-items: center;
        justify-content: space-between;
        height: calc(7 * var(--sys-spacing-track));

        text-shadow: 0.05em 0.05em 0.2em #0008;

        font-family: var(--sys-typescale-title-medium-font-family-name);
        font-weight: var(--sys-typescale-title-medium-font-weight);
        font-size: var(--sys-typescale-title-medium-font-size);
        letter-spacing: var(--sys-typescale-title-medium-letter-spacing);
        line-height: var(--sys-typescale-title-medium-line-height);
      }

      footer span {
        display: flex;
        align-items: flex-end;
        gap: calc(0.6 * var(--sys-spacing-track));
        padding-inline-start: calc(2 * var(--sys-spacing-track));
      }

      footer span alwatr-icon {
        font-size: calc(3 * var(--sys-spacing-track));
      }

      footer span alwatr-icon.love {
        color: hsl(350deg 70% 50%);
      }

      footer span alwatr-icon.him {
        color: hsl(130deg 100% 40%);
      }
    `,
  ];

  override connectedCallback(): void {
    super.connectedCallback();

    l10n.setLocal({
      code: 'fa-IR',
      direction: 'rtl',
      language: 'fa',
    });
  }

  protected override _routes: RoutesConfig = {
    map: (route) => route.sectionList[0]?.toString(),
    list: {
      home: {
        render: () => html`<alwatr-page-home></alwatr-page-home>`,
      },
    },
  };

  override render(): unknown {
    super.render();
    return html`
      <header>
        <alwatr-standard-icon-button icon="menu-outline" stated></alwatr-standard-icon-button>
        <alwatr-standard-icon-button
          icon="salavat-small"
          url-prefix="/images/icons/"
          stated
        ></alwatr-standard-icon-button>
      </header>
      <div class="main-image">
        <alwatr-standard-icon-button icon="add-outline" filled stated></alwatr-standard-icon-button>
      </div>
      <main class="page-container">${router.outlet(this._routes)}</main>
      <footer>
        <span class="made-with-love">
          Made With
          <alwatr-icon name="heart" class="love"></alwatr-icon>
          for
          <alwatr-icon name="heart" class="him"></alwatr-icon>
        </span>

        <alwatr-standard-icon-button icon="cloud-download-outline" stated></alwatr-standard-icon-button>
      </footer>
    `;
  }
}
