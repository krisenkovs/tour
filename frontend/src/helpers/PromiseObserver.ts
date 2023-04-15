import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { useEffect } from 'react';
import { notification } from 'antd';

enum PROMISE_TYPE {
  PENDING,
  FULFILLED,
  ERROR,
}

export class PromiseObserver<T> {
  state: PROMISE_TYPE = PROMISE_TYPE.PENDING;
  value?: T = undefined;
  error?: Record<string, string> = undefined;

  constructor(promise: Promise<T>, oldValue?: T) {
    this.value = oldValue;
    makeObservable(this, {
      state: observable,
      value: observable,
      error: observable,
      pending: computed,
      fulfilled: computed,
      rejected: computed,
      onResolve: action.bound,
      onReject: action.bound,
    });

    promise.then((response: T) => this.onResolve(response)).catch((response) => this.onReject(response));
  }

  onResolve(response: T) {
    this.state = PROMISE_TYPE.FULFILLED;
    this.value = response;
  }

  onReject(response: Record<string, string>) {
    console.log(response);
    this.state = PROMISE_TYPE.ERROR;
    this.error = response;
  }

  get pending() {
    return this.state === PROMISE_TYPE.PENDING;
  }

  get fulfilled() {
    return this.state === PROMISE_TYPE.FULFILLED;
  }

  get rejected() {
    return this.state === PROMISE_TYPE.ERROR;
  }
}

export function fromPromise<T>(origPromise: Promise<T>, options?: { oldData?: T }) {
  return new PromiseObserver<T>(origPromise, options?.oldData);
}

export function useObserveSuccess<T>(promise?: PromiseObserver<T>, callback?: CallableFunction) {
  useEffect(() => {
    console.log('reactions', promise);
    const disposer = reaction(
      () => promise?.fulfilled,
      (fulfilled) => {
        if (fulfilled) {
          callback?.();
        }
      },
    );

    return () => {
      disposer();
    };
  }, [promise]);
}

export function useObserveError<T>(promise?: PromiseObserver<T>, callback?: CallableFunction) {
  useEffect(() => {
    const disposer = reaction(
      () => promise?.rejected,
      (rejected) => {
        if (rejected) {
          notification.error({ message: promise?.error?.message });
          callback?.();
        }
      },
    );

    return () => {
      disposer();
    };
  }, [promise]);
}
