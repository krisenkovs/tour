import { fromPromise, httpService, PromiseObserver } from 'helpers';
import { action, makeObservable, observable, reaction } from 'mobx';

class Store {
  isLogin = false;
  loginPromise?: PromiseObserver<{ token: string }> = undefined;

  constructor() {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
    }

    makeObservable(this, {
      loginPromise: observable,
      login: action.bound,
    });

    reaction(
      () => this.loginPromise?.value,
      (value) => {
        this.isLogin = !!this.loginPromise?.value?.token;
        localStorage.setItem('token', this.loginPromise?.value?.token || '');
      },
    );
  }

  login(email?: string, password?: string) {
    this.loginPromise = fromPromise(httpService.post('api/login', { email, password }));
  }
}

export const applicationStore = new Store();
