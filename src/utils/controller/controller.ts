import { Router } from '@/utils/router';

import { Model } from '@/components/model/model';
import { View } from '@/components/view';

export class Controller {
  private router: Router;
  view: View;
  model: Model;

  constructor() {
    this.model = new Model();
    this.view = new View({
      onLogin: this.model.loginUser.bind(this.model),
      onRegistration: this.model.registerUser.bind(this.model),
      onSetting: this.model.setSettings.bind(this.model),
      onGetUser: this.model.getUser.bind(this.model),
      onSetTransaction: this.model.setTransactions.bind(this.model),
    });
    this.router = new Router({
      onupdate: this.view.main.updateMain.bind(this.view.main),
      changePages: this.view.changePages.bind(this.view),
    });
  }

  addQueryListener(): void {
    this.router.queryListener();
  }

  getDataFromModel(): string {
    return 'data from model';
  }

  checkRestartPage(): void {
    const query = localStorage.getItem('query');

    if (typeof query === 'string') {
      history.pushState(null, '', `${location.origin}${query}`);
    } else {
      history.pushState(null, '', `${location.origin}/signup`);
    }

    this.router.routeCallback();
  }
}
