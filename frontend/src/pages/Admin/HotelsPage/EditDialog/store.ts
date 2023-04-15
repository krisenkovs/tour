import { DialogStore } from 'helpers/DialogStore';
import { fromPromise, httpService, PromiseObserver } from 'helpers';
import { action, makeObservable, observable } from 'mobx';

class Store extends DialogStore<any> {
  savePromise?: PromiseObserver<void> = undefined;
	countriesPromise?: PromiseObserver<{ id: number; name: string }[]> = undefined;

  constructor() {
    super();
    makeObservable(this, {
      savePromise: observable,
			countriesPromise:observable,
      save: action.bound,
			loadCountries:action.bound,
      create: action.bound,
    });
  }
	loadCountries(){
		this.countriesPromise = fromPromise(httpService.get('/api/country'))
	}

  create(entity: { name: string; active: boolean }) {
    this.savePromise = fromPromise(httpService.post('/api/hotel', entity));
  }

  save(entity: { id: number; name: string; active: boolean }) {
    this.savePromise = fromPromise(httpService.put(`/api/hotel/${entity?.id}`, entity));
  }
}

export const store = new Store();
