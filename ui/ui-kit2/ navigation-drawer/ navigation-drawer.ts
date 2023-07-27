/* eslint-disable lit/attribute-value-entities */
import {AlwatrDirective, directive, html, type PartInfo} from '@alwatr/fract';

export class AlwatrNavigationDrawerDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-navigation-drawer>');
  }

  render(): unknown {
    this._logger.logMethod?.('render');

    return html`
      <aside
        id="navigationDrawer"
        class="fixed bottom-0 left-0 top-0 z-modal w-[22.5rem] translate-x-full transform-gpu overflow-clip
        rounded-e-2xl bg-surfaceContainerLow transition-transform duration-300 ease-in will-change-transform elevation-1
        rtl:left-auto rtl:right-0 extended:translate-x-0 extended:rounded-none extended:transition-none
        extended:will-change-auto extended:elevation-0 [&.opened]:translate-x-0 [&.opened]:ease-out"
      >
        <nav class="flex h-full flex-col bg-surfaceContainerLow px-3 py-3 elevation-1">
          <h2 class="mx-6 py-7 text-titleSmall text-onSurfaceVariant">سربرگ</h2>
          ${this._renderNavItems()}
        </nav>
      </aside>
    `;
  }

  protected _renderNavItems(): unknown {
    return html`
      <ul class="text-labelLarge text-onSurfaceVariant">
        <li class="flex h-14 cursor-pointer select-none flex-nowrap items-center rounded-full bg-secondaryContainer
          px-3 text-onSecondaryContainer stateActive-secondaryContainer"
        >
          <alwatr-icon name="menu-outline" class="mx-1 h-6 w-6"></alwatr-icon>
          <div class="mx-2 grow">دریافتی</div>
          <div class="ml-3">۲۶</div>
        </li>

        <li class="w-84 group flex h-14 cursor-pointer select-none flex-nowrap items-center rounded-full
            px-3 hover:bg-secondaryContainer hover:text-onSecondaryContainer hover:stateHover-onSecondaryContainer
            active:text-onSecondaryContainer active:stateActive-onSecondaryContainer"
        >
          <alwatr-icon name="person-outline" class="mx-1 h-6 w-6"></alwatr-icon>
          <div class="mx-2 grow">مخاطبین</div>
        </li>

        <li class="w-84 group flex h-14 cursor-pointer select-none flex-nowrap items-center rounded-full px-3
          hover:bg-secondaryContainer hover:text-onSecondaryContainer hover:stateHover-onSecondaryContainer
          active:text-onSecondaryContainer active:stateActive-onSecondaryContainer"
        >
          <alwatr-icon name="create-outline" class="mx-1 h-6 w-6"></alwatr-icon>
          <div class="mx-2 grow">ارسال</div>
        </li>

        <li class="w-84 group flex h-14 cursor-pointer select-none flex-nowrap items-center rounded-full
          px-3 hover:bg-secondaryContainer hover:text-onSecondaryContainer hover:stateHover-onSecondaryContainer
          active:text-onSecondaryContainer active:stateActive-onSecondaryContainer"
        >
          <alwatr-icon name="archive-outline" class="mx-1 h-6 w-6"></alwatr-icon>
          <div class="mx-2 grow">آرشیو</div>
        </li>

        <li class="w-84 group flex h-14 cursor-pointer select-none flex-nowrap items-center rounded-full px-3
          hover:bg-secondaryContainer hover:text-onSecondaryContainer hover:stateHover-onSecondaryContainer
          active:text-onSecondaryContainer active:stateActive-onSecondaryContainer"
        >
          <alwatr-icon name="trash-outline" class="mx-1 h-6 w-6"></alwatr-icon>
          <div class="mx-2 grow">سطل زباله</div>
        </li>
      </ul>
    `;
  }
}

export const alwatrNavigationDrawer = directive(AlwatrNavigationDrawerDirective);
