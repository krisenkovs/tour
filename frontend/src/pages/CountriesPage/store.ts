import { fromPromise, httpService, PromiseObserver } from 'helpers';
import { action, makeObservable, observable } from 'mobx';
import { Country } from 'types';

class Store {
  countriesPromise?: PromiseObserver<Country[]> = undefined;

  constructor() {
    makeObservable(this, {
      countriesPromise: observable,
      loadActiveCountries: action.bound,
      destroy: action.bound,
    });
  }

  loadActiveCountries() {
    this.countriesPromise = fromPromise(httpService.get('/api/countries/active'));
  }

  destroy() {
    this.countriesPromise = undefined;
  }
}

export const store = new Store();
