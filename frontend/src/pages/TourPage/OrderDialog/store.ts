import { DialogStore } from 'helpers/DialogStore';
import { fromPromise, httpService, PromiseObserver } from 'helpers';
import { action, makeObservable, observable } from 'mobx';
import {TourType} from "types";

class Store extends DialogStore<TourType> {
	savePromise?: PromiseObserver<void> = undefined;
	constructor() {
		super();
		makeObservable(this, {
			savePromise: observable,
			create: action.bound,
		});
	}

	create(entity: any) {
		this.savePromise = fromPromise(httpService.post('order/create', entity));
	}
}

export const store = new Store();
