import detectEthereumProvider from '@metamask/detect-provider';
import { useToast } from 'vue-toastification';
import Cookies from 'js-cookie';
import { useI18n } from 'vue-i18n';
import { contractAddress, smartData } from './constants';

export const getContract = () => {
  const toast = useToast();
  let initedWeb3;
  console.log({ contractAddress });
  try {
    initedWeb3 = new window.Web3(
      new window.Web3.providers.HttpProvider(
        'https://data-seed-prebsc-2-s2.binance.org:8545/',
      ),
    );
  } catch (error) {
    toast.error(
      'Что то пошло не так при инициализации контракта. Попробуйте обновить страницу',
    );
  }

  const contract = new initedWeb3.eth.Contract(smartData, contractAddress);

  console.log('contract.methods:', contract.methods);

  return contract;
};

export const getAcc = async () => {
  const toast = useToast();
  const provider = await detectEthereumProvider();
  const { t } = useI18n({ useScope: 'global' });

  if (!provider || !provider.isMetaMask) {
    toast.error(t('Установите расширение MetaMask и попробуйте снова!'));
    return undefined;
  }

  try {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });

    return accounts[0];
  } catch (error) {
    return null;
  }
};

export const sendGift = async () => {
  const toast = useToast();
  const contract = getContract();
  const account = await getAcc();
  const { t } = useI18n({ useScope: 'global' });
  if (!account) {
    toast.error(t('Что то пошло не так при попытке получить адрес'));
    return null;
  }

  const data = contract.methods.gift().encodeABI();
  const params = [
    {
      from: account,
      to: contractAddress,
      data,
    },
  ];

  console.log('data from getNumberGift', data);

  return window.ethereum.request({
    method: 'eth_sendTransaction',
    params,
  });
};

export const checkGift = async () => {
  const toast = useToast();
  const contract = getContract();
  const { t } = useI18n({ useScope: 'global' });
  const account = await getAcc();
  if (!account) {
    toast.error(t('Что то пошло не так при попытке получить адрес'));
    return null;
  }

  const provider = await detectEthereumProvider();

  const data2 = contract.methods.getNumberGift(account).encodeABI();
  console.log('data from getNumberGift', data2);

  const params2 = [
    {
      to: contractAddress,
      data: data2,
    },
  ];

  let currentGift;

  try {
    currentGift = await provider.request({
      method: 'eth_call',
      params: params2,
    });

    if (typeof currentGift !== 'string') {
      toast.error(t('Ошибка типа при проверке NFT'));
      return null;
    }

    return currentGift[currentGift.length - 1];
  } catch (error) {
    console.error(error);
    toast.error(t('Неизвестная ошибка при проверке NFT'));
    return null;
  }
};

export const setAwaitNFTCookie = (value) => {
  Cookies.set('awaitnft', value, { expires: 1 });
};

export const getAwaitNFTCookie = () => Cookies.get('awaitnft');
