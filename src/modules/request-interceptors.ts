/* eslint-disable @typescript-eslint/ban-ts-comment */
import { StoreInterface } from '@/store/index';
import { AxiosInstance } from 'axios';

export interface InterceptorsOptionsInterface {
  store: StoreInterface;
  $http: AxiosInstance;
}

function setAuthHeaders({ store, $http }: InterceptorsOptionsInterface) {
  const { accessToken } = store.state.accounts;
  if (accessToken) {
    $http.defaults.headers.common.Authorization = `Bearer ${accessToken}`; // eslint-disable-line
  } else {
    delete $http.defaults.headers.common.Authorization; // eslint-disable-line
  }
}

export default ({ store, $http }: InterceptorsOptionsInterface): void => {
  // Initialize the function first time
  setAuthHeaders({
    store,
    $http,
  });

  // Add a request interceptor
  $http.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      setAuthHeaders({
        store,
        $http,
      });
      store.dispatch('setRequestStatus', {
        inProgress: true,
        status: 'IN_PROGRESS',
        // @ts-ignore
        key: config.requestName || '',
      });
      // $progress.start(); // for every request start the progress
      return config;
    },
    (error) => Promise.reject(error), // Do something with request error
  );

  // Add a response interceptor
  $http.interceptors.response.use(
    (response) => {
      // Do something with response data
      // @ts-ignore
      if (response.config.requestName !== 'newRelic') store.dispatch('clearRequestStatus', response.config.requestName);
      // $progress.finish(); // finish when a response is received
      return response;
    },
    (error) => {
      if (!error || !error.response || !error.response.config) {
        console.warn({ ...error }.toJSON());
        store.dispatch('logout', store.state.route.fullPath);
        return Promise.reject(error);
      }
      if (error.response && error.response.config && error.response.config.requestName === 'newRelic') return Promise.reject(error);
      // Do something with response error
      try {
        if (error.response && error.response.status === 401) {
          store.dispatch('addToastNotifications', {
            text: (error.response && error.response.data && error.response.data.error && error.response.data.error.description) || 'Oops! Your session expired. Please log in again!',
            timer: 4000,
            type: 'error',
            status: 401,
          });

          // Logout the user
          store.dispatch('logout', store.state.route.fullPath);
        } else if (error.response && error.response.status === 403) {
          store.dispatch('addToastNotifications', {
            text: (error.response && error.response.data && error.response.data.error && error.response.data.error.description) || error.message || 'Invalid username or password',
            timer: 4000,
            type: 'error',
          });
        } else {
          console.warn('Logging response error:');
          console.warn(error);
          store.dispatch('addToastNotifications', {
            text: (error.response && error.response.data && error.response.data.error && error.response.data.error.description) || error.message || 'Some error occurred.',
            timer: 4000,
            type: 'error',
          });
        }
      } catch (e) {
        try {
          console.warn(e, { ...e }); // eslint-disable-line
          console.warn(JSON.stringify({ ...e })); // eslint-disable-line
        } catch (err) {
          console.warn(err);
        }
        store.dispatch('addToastNotifications', {
          text: e.message || 'Generic error',
          timer: 4000,
          type: 'error',
        });
      }

      store.dispatch('clearRequestStatus', error.response.config.requestName);
      // $progress.finish(); // finish when a response is received
      return Promise.reject(error);
    },
  );
};
