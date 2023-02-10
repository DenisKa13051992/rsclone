import { BaseComponent } from '../../base/baseComponent';

import { TransactionList } from './transactionList';
import { TransactionPeriod } from './transactionPeriod';

export class Overview extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;
  pageTitle: HTMLElement;
  pageContent: HTMLElement;
  transactionPeriodContainer: HTMLElement;
  transactionsListContainer: HTMLElement;
  transactionPeriod: TransactionPeriod;
  transactionList: TransactionList;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.container = this.createElem('div', 'content__container flex flex-col');
    this.pageTitle = this.createElem(
      'div',
      'page__title ml-2 text-3xl text-sky-600 mb-5',
      'Overview',
    );
    this.pageContent = this.createElem('div', 'page__content gap-2 flex');
    this.transactionPeriodContainer = this.createElem(
      'div',
      'expense__period border-2 p-2 basis-1/2',
    );
    this.transactionsListContainer = this.createElem(
      'div',
      'transactions__list border-2 p-2 basis-1/2',
    );
    this.pageContent.append(this.transactionPeriodContainer, this.transactionsListContainer);
    this.container.append(this.pageTitle, this.pageContent);
    this.transactionPeriod = new TransactionPeriod(this.transactionPeriodContainer);
    this.transactionList = new TransactionList(this.transactionsListContainer);
    this.render();
  }

  render(): void {
    this.root.appendChild(this.container);
  }
}