import { $authHost } from './index';

export const createWallet = async (name) => {
  const { data } = await $authHost.post('api/wallet', { name });
  return data;
};

export const fetchWallet = async () => {
  const { data } = await $authHost.get('api/wallet');
  return data;
};

export const changeWallet = async (walletId, newName, newBalance) => {
  const { data } = await $authHost.put(`api/wallet/${walletId}`, { newName, newBalance });
  return data;
};

export const transferWallet = async (fromWalletId, toWalletId, amount) => {
  const { data } = await $authHost.post(`api/wallet/transfer/from/${fromWalletId}/to/${toWalletId}`, { amount });
  return data;
};

export const deleteWallet = async (walletId) => {
  const { data } = await $authHost.delete(`api/wallet/${walletId}`);
  return data;
};
