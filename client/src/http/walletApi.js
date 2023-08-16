import { $authHost } from './index';

export const createWallet = async (name, currency) => {
  const { data } = await $authHost.post('api/wallet', { name, currency });
  return data;
};

export const fetchWallet = async () => {
  const { data } = await $authHost.get('api/wallet');
  return data;
};

export const changeWallet = async (walletId, newName, newBalance, newCurrency) => {
  const { data } = await $authHost.put(`api/wallet/${walletId}`, { newName, newBalance, newCurrency });
  return data;
};

export const deleteWallet = async (walletId) => {
  const { data } = await $authHost.delete(`api/wallet/${walletId}`);
  return data;
};
