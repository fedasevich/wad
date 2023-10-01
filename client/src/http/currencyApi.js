import { $authHost } from './index';

export const fetchExchangeRates = async () => {
  const { data } = await $authHost.get('api/currency/rates');
  return data;
};
