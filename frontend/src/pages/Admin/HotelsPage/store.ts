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
      delete: action.bound,
    });
  }

  load() {
    this.itemsPromise = fromPromise(httpService.get('/api/hotel'), { oldData: this.itemsPromise?.value });
  }

  delete(id?: number) {
    this.savePromise = fromPromise(httpService.delete(`/api/hotel/${id}`, {}));
  }
}

export const store = new Store();
