import {css, customElement} from '@alwatr/element';

import {AlwatrCard} from './card.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-filled-card': AlwatrFilledCard;
  }
}

/**
 * Alwatr filled card element.
 */
@customElement('alwatr-filled-card')
export class AlwatrFilledCard extends AlwatrCard {
  static override styles = [
    ...AlwatrCard.styles,
    css`
      :host {
        color: var(--md-sys-color-surface-tint);
        background-color: var(--md-sys-color-surface-variant);

        --_elevation-level: 0;
      }
    `,
  ];
}
