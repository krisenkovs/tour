import { fromPromise, httpService, PromiseObserver } from 'helpers';
import { action, makeObservable, observable } from 'mobx';
import { CountryType, TourType } from 'types';

class Store {
  countriesPromise?: PromiseObserver<CountryType[]> = undefined;
  toursPromise?: PromiseObserver<TourType[]> = undefined;

  constructor() {
    makeObservable(this, {
      countriesPromise: observable,
      toursPromise: observable,
      loadCountries: action.bound,
      findTours: action.bound,
			clear:action.bound
    });
  }

  loadCountries() {
    this.countriesPromise = fromPromise(httpService.get('/country'));
  }

  findTours(filter: TourType) {
    this.toursPromise = fromPromise(httpService.post(`/tours/find`, filter));
  }

	clear(){
		this.countriesPromise = undefined;
		this.toursPromise = undefined;
	}
}

export const store = new Store();
