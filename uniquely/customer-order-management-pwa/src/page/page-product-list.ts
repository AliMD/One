import {AlwatrElement} from '@alwatr/element';
import {SignalInterface} from '@alwatr/signal';
import {css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';

import {sampleProductList, Product} from '../config.js';
import styles from '../style/index.js';

import '../component/product-card.js';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-product-list': PageProductList;
  }
}

@customElement('page-product-list')
export class PageProductList extends AlwatrElement {
  static override styles = [
    ...styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
      }
      .cards {
        display: flex;
        flex-wrap: wrap;
        padding: var(--card-padding);
        gap: var(--card-padding);

        --card-padding: 16px;
      }
      .cards product-card {
        min-width: 128px;
        max-width: 256px;
      }
    `,
  ];

  @state() private __productList: Product[] = [];

  static productListSignal = new SignalInterface('product-list');

  override connectedCallback(): void {
    super.connectedCallback();

    this.__productList = sampleProductList;
    PageProductList.productListSignal.addListener(() => {
      // this.__productList = sampleProductList;
    });
  }

  override render(): TemplateResult {
    return html`
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>شرکت تولیدی بازرگانی سافیت</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content fullscreen>${this._renderCards(this.__productList)}</ion-content>
    `;
  }

  protected _renderCards(products: Product[]): TemplateResult {
    const cards = products.map(
        (product) =>
          html`
          <product-card
            id=${product.id}
            .name=${product.title}
            .imageSrc=${product.image}
            .price=${product.price}
          ></product-card>
        `,
    );

    return html` <div class="cards">${cards}</div> `;
  }
}
