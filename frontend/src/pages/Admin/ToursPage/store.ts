import { fromPromise, httpService, PromiseObserver } from 'helpers';
import { action, makeObservable, observable } from 'mobx';
import { TourType } from 'types';

class Store {
  itemsPromise?: PromiseObserver<TourType[]> = undefined;
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
    this.itemsPromise = fromPromise(httpService.get('/api/tour'), { oldData: this.itemsPromise?.value });
  }

  delete(id?: number) {
    this.savePromise = fromPromise(httpService.delete(`/api/tour/${id}`, {}));
  }
}

export const store = new Store();
