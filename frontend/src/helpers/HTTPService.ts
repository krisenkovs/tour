import { applicationStore } from 'application/store';

class HTTPService {
  private makeRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: any,
    contentType = 'application/json',
  ) {
    return fetch(url, {
      method,
      credentials: 'same-origin',
      body: contentType === 'application/json' ? JSON.stringify(data) : data,
      headers: {
        'Content-type': contentType,
        Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
      },
    })
      .then(async (data) => {
        if (data.status === 401) {
          applicationStore.logout();
          return Promise.reject();
        }

        if (data.status === 500) {
          return Promise.reject({ message: 'system-error' });
        }

        if (data.status === 202) {
          return Promise.resolve();
        }

        if (data.status === 400) {
          const error = await data.json();

          console.log(error);

          return Promise.reject(error);
        }

        if (data.status == 200) {
          if (data.headers.get('content-type')?.includes('application/json')) {
            const text = await data.text();

            try {
              console.log('parse s', JSON.parse(text));
              return JSON.parse(text);
            } catch (e) {
              console.log(e, 'parse', text);
              return text;
            }
          } else {
            return data.text();
          }
        } else {
          return Promise.reject('error');
        }
      })
      .catch((e) => Promise.reject(e));
  }

  public post<I, O>(url: string, data: I, contentType?: string) {
    return this.makeRequest<O>('POST', url, data, contentType);
  }

  public put<I, O>(url: string, data: I, contentType?: string) {
    return this.makeRequest<O>('PUT', url, data, contentType);
  }

  public delete<I, O>(url: string, data: I, contentType?: string) {
    return this.makeRequest<O>('DELETE', url, data, contentType);
  }

  public get<T>(url: string) {
    return this.makeRequest<T>('GET', url);
  }
}

export const httpService = new HTTPService();
