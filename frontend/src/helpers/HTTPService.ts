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
      .then((data) => {
        if (data.status == 200) {
          if (data.headers.get('Content-Type')?.includes('application/json')) {
            return data.json();
          } else {
            return data.text();
          }
        } else {
          return Promise.reject();
        }
      })
      .catch(() => Promise.reject());
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
