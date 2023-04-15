import { DialogStore } from 'helpers/DialogStore';
import { fromPromise, httpService, PromiseObserver } from 'helpers';
import { action, makeObservable, observable } from 'mobx';
import { CountryType } from 'types';

class Store extends DialogStore<any> {
  savePromise?: PromiseObserver<void> = undefined;

  constructor() {
    super();
    makeObservable(this, {
      savePromise: observable,
      save: action.bound,
      create: action.bound,
    });
  }

  create(entity: Omit<CountryType, 'id'>) {
    this.savePromise = fromPromise(httpService.post('/api/country', entity));
  }

  save(entity: CountryType) {
    this.savePromise = fromPromise(httpService.put(`/api/country/${entity?.id}`, entity));
  }
}

export const store = new Store();
