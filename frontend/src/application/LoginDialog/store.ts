import { DialogStore } from 'helpers/DialogStore';
import { fromPromise, httpService, PromiseObserver } from 'helpers';
import { action, makeObservable, observable, reaction } from 'mobx';

class Store extends DialogStore<any> {
  loginPromise?: PromiseObserver<{ token: string }> = undefined;
  constructor() {
    super();
    makeObservable(this, {
      loginPromise: observable,
      login: action.bound,
    });
  }

  login(entity: any) {
    this.loginPromise = fromPromise(httpService.post('/login', entity));
  }
}

export const store = new Store();
