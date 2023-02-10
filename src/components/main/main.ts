import { BaseComponent } from '../base/baseComponent';
import { Calendar } from '../pages/calendar/calendar';
import { Overview } from '../pages/overview/overview';

import { SideBar } from './sideBar';

export class Main extends BaseComponent {
  root: HTMLElement;
  container: HTMLElement;
  sideBar: SideBar;
  content: HTMLElement;
  calendar: Calendar;
  calendarHTML: HTMLElement;
  overviewHTML: HTMLElement;
  overview: Overview;

  constructor(root: HTMLElement) {
    super();
    // this.view = view;
    this.root = root;
    this.container = this.createElem('main', 'container mx-auto flex');
    this.content = this.createElem('section', 'content w-full border-t-2 border-l-2 p-3');
    this.sideBar = new SideBar(this.container);
    this.overviewHTML = this.createElem('overview', undefined);
    this.overview = new Overview(this.overviewHTML);
    this.container.appendChild(this.content);
    this.calendarHTML = this.createElem('section', undefined);
    this.calendar = new Calendar(this.calendarHTML);
  }

  render(): void {
    this.root.appendChild(this.container);
  }

  updateMain(main: string, index: number): void {
    if (main === '/calendar') {
      this.content.textContent = '';
      this.content.appendChild(this.calendarHTML);
    } else if (main === '/overview') {
      this.content.textContent = '';
      this.content.appendChild(this.overviewHTML);
    } else {
      this.content.textContent = main;
    }

    this.sideBar.buttonActive(index);
  }
}