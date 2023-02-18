import { BaseComponent } from '@/components/base/baseComponent';

export class InputSelect extends BaseComponent {
  root: HTMLElement;
  options: string[];
  title: string;
  filterSelect: HTMLInputElement;
  prop: (way: string) => void;

  constructor(root: HTMLElement, title: string, options: string[], prop: (way: string) => void) {
    super();
    this.root = root;
    this.title = title;
    this.prop = prop;

    this.options = options;
    this.filterSelect = this.createElem(
      'select',
      'peer h-full w-full rounded-[7px] cursor-pointer border border-blue-gray-200 bg-transparent font-sans text-sm font-normal transition-all focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0',
    );
    this.render();
  }

  render(): void {
    const filterContainer = this.createElem(
      'div',
      'relative h-8 w-full min-w-[100px] max-w-[200px]',
    );

    this.options.forEach((item) => {
      const option = this.createElem('option', 'option__item', item);

      option.setAttribute('value', item);

      this.filterSelect.append(option);
    });
    const storageTransactionSelectType = localStorage.getItem(`${this.title}`);

    if (storageTransactionSelectType !== null) {
      this.filterSelect.value = storageTransactionSelectType;
    }

    const inputLabel = this.createElem(
      'label',
      'w-fit h-min bg-white p-1 absolute left-2 -top-3 flex h-full w-full text-[11px] leading-tight text-stone-500 transition-all',
      this.title,
    );

    this.filterSelect.addEventListener('change', () => {
      localStorage.setItem(`${this.title}`, `${this.filterSelect.value}`);
      this.prop(this.filterSelect.value);
    });

    filterContainer.append(this.filterSelect, inputLabel);
    this.root.appendChild(filterContainer);
  }
}
