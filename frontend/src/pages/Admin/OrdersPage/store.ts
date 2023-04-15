import { fromPromise, httpService, PromiseObserver } from 'helpers';
import { action, makeObservable, observable } from 'mobx';

class Store {
  itemsPromise?: PromiseObserver<{ id: number; name: string; active: boolean }[]> = undefined;
  savePromise?: PromiseObserver<void> = undefined;

  constructor() {
    makeObservable(this, {
      itemsPromise: observable,
      savePromise: observable,
      load: action.bound,
      check: action.bound,
    });
  }

  load() {
    this.itemsPromise = fromPromise(httpService.get('/api/order'), { oldData: this.itemsPromise?.value });
  }

  check(id?: number) {
    this.savePromise = fromPromise(httpService.post(`/api/order/${id}/check`, {}));
  }
}

export const store = new Store();
