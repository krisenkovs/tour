import { DialogStore } from 'helpers/DialogStore';
import { fromPromise, httpService, PromiseObserver } from 'helpers';
import { action, makeObservable, observable } from 'mobx';
import {TourType} from "types";

class Store extends DialogStore<any> {
  savePromise?: PromiseObserver<void> = undefined;
  hotelsPromise?: PromiseObserver<{ id: number; name: string }[]> = undefined;

  constructor() {
    super();
    makeObservable(this, {
      savePromise: observable,
      hotelsPromise: observable,
      save: action.bound,
      loadCountries: action.bound,
      create: action.bound,
    });
  }
  loadCountries() {
    this.hotelsPromise = fromPromise(httpService.get('/api/hotel'));
  }

  create(entity: Omit<TourType,'id'>) {
    this.savePromise = fromPromise(httpService.post('/api/tour', entity));
  }

  save(entity: TourType) {
    this.savePromise = fromPromise(httpService.put(`/api/tour/${entity?.id}`, entity));
  }
}

export const store = new Store();
