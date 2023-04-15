import { fromPromise, httpService, PromiseObserver } from 'helpers';
import { action, makeObservable, observable } from 'mobx';
import {CountryType} from "types";

class Store {
  itemsPromise?: PromiseObserver<CountryType[]> = undefined;
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
    this.itemsPromise = fromPromise(httpService.get('/api/country'), { oldData: this.itemsPromise?.value });
  }

  delete(id?: number) {
    this.savePromise = fromPromise(httpService.delete(`/api/country/${id}`, {}));
  }
}

export const store = new Store();
