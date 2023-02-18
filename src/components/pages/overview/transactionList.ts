import { BaseComponent } from '@/components/base/baseComponent';
import type { PostJsonResponse, ITransactionReq } from '@/components/model/types';
import { TransactionItems } from '@/components/pages/overview/tranactionItems';

import { InputSelect } from './inputSelect';

interface ITransactionsList {
  delete: <T>(id: number) => Promise<PostJsonResponse<T>>;
  rebuild: () => void;
}

export class TransactionList extends BaseComponent {
  root: HTMLElement;
  transactionItems: HTMLElement;
  sortContainer: HTMLElement;
  sortItem: InputSelect;
  filterItem: InputSelect;
  transactionItem: TransactionItems;
  transactionData: ITransactionReq[];
  filterData: ITransactionReq[];
  prop: ITransactionsList;

  constructor(root: HTMLElement, prop: ITransactionsList, transactionData: ITransactionReq[]) {
    super();
    this.root = root;
    this.prop = prop;
    this.transactionData = transactionData;
    this.filterData = transactionData;
    this.sortContainer = this.createElem(
      'div',
      'transaction-list__sort gap-2 mb-4 flex justify-around',
    );
    this.transactionItems = this.createElem(
      'div',
      'period__items flex flex-col max-h-[36rem] overflow-y-scroll',
    );
    this.sortItem = new InputSelect(
      this.sortContainer,
      'Sort transactions',
      ['DateInc', 'DateDec', 'SumInc', 'SumDec'],
      this.getSortData,
    );
    this.filterItem = new InputSelect(
      this.sortContainer,
      'Filter transactions',
      ['All', 'Expense', 'Income'],
      this.getFilterData,
    );
    this.transactionItem = new TransactionItems(this.transactionItems, prop, transactionData);
    // this.render();
  }

  getSortData = (way: string): void => {
    switch (way) {
      case 'SumInc':
        this.filterData = this.filterData.sort((a, b) => a.sum - b.sum);
        break;

      case 'SumDec':
        this.filterData = this.filterData.sort((a, b) => b.sum - a.sum);
        break;

      case 'DateInc':
        this.filterData = this.filterData.sort(
          (a, b) =>
            Math.floor(new Date(`${a.date}T${a.time}:00`).getTime() / 1000) -
            Math.floor(new Date(`${b.date}T${b.time}:00`).getTime() / 1000),
        );
        break;

      case 'DateDec':
        this.filterData = this.filterData.sort(
          (a, b) =>
            Math.floor(new Date(`${b.date}T${b.time}:00`).getTime() / 1000) -
            Math.floor(new Date(`${a.date}T${a.time}:00`).getTime() / 1000),
        );
        break;

      default:
        break;
    }

    this.transactionItems.replaceChildren();
    this.transactionItem = new TransactionItems(this.transactionItems, this.prop, this.filterData);
  };

  getFilterData = (way: string): void => {
    switch (way) {
      case 'Expense':
        this.filterData = this.transactionData.filter((item) => item.type === 'Expense');
        break;

      case 'Income':
        this.filterData = this.transactionData.filter((item) => item.type === 'Income');
        break;

      case 'All':
        this.filterData = this.transactionData;
        break;

      default:
        break;
    }

    this.transactionItems.replaceChildren();
    this.transactionItem = new TransactionItems(this.transactionItems, this.prop, this.filterData);
  };

  getDataFromStorage(): void {
    const storageSortTransType = localStorage.getItem('Sort transactions');
    const storageFilterTransType = localStorage.getItem('Filter transactions');

    if (storageSortTransType !== null) {
      this.getSortData(storageSortTransType);
    }

    if (storageFilterTransType !== null) {
      this.getFilterData(storageFilterTransType);
    }
  }

  render = (): void => {
    this.getDataFromStorage();
    const container = this.createElem('div', 'transaction-list__container flex flex-col');
    const transactionListTitle = this.createElem(
      'div',
      'transaction-list text-2xl mb-4 font-light text-sky-600 dark:font-medium dark:text-stone-600',
      'Transactions',
    );

    container.append(transactionListTitle, this.sortContainer, this.transactionItems);
    this.root.appendChild(container);
  };
}
