// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { $authHost, $host } from './index';

export const registration = async (email, password) => {
  const { data } = await $host.post('api/user/registration', { email, password });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth');
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const changeCurrencyId = async (currencyId, newCurrencyRate, convert) => {
  const { data } = await $authHost.put('api/user/currency', { currencyId, convert, newCurrencyRate });
  localStorage.setItem('token', data.token);

  return { user: jwt_decode(data.token), exchangeRates: data.rates, updatedWallets: data.updatedWallets };
};
