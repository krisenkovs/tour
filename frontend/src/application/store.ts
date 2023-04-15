import { action, makeObservable, observable } from 'mobx';
import { fromPromise, httpService, PromiseObserver } from 'helpers';

class Store {
  isLogin = false;
  logoutPromise?: PromiseObserver<{ token: string }> = undefined;

  constructor() {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
    }

    makeObservable(this, {
      isLogin: observable,
      logoutPromise: observable,
      setLoginToken: action.bound,
      logout: action.bound,
    });
  }

  setLoginToken(token?: string) {
    if (token) {
      this.isLogin = true;
      localStorage.setItem('token', token);
    } else {
      this.isLogin = false;
      localStorage.removeItem('token');
    }
  }

  logout() {
    this.logoutPromise = fromPromise(httpService.post('/logout', {}));
  }
}

export const applicationStore = new Store();
