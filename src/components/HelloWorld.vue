<template>
  <div class="hello">
    init: {{ init }}
    <br />
    account: {{ account }}
    <br />
    currentGift: {{ currentGift }}
    <br />

    <button @click="getAcc">connect</button>

    <button v-show="!getGiftLoading" @click="sendGift">get gift</button>
    <span v-show="getGiftLoading">Loading</span>
    <button @click="checkGift">check gift</button>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import detectEthereumProvider from '@metamask/detect-provider';
import { onMounted } from 'vue';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup() {
    const init = ref('');
    const account = ref('');
    const currentGift = ref('');
    const getGiftLoading = ref('');
    let initedWeb3;
    let contract;

    const contractAddress = '0x4a812e01F64c0480c3373E3Ad8d9De82aEbC4AE9';

    onMounted(() => {
      try {
        initedWeb3 = new window.Web3(new window.Web3.providers.HttpProvider('https://data-seed-prebsc-2-s2.binance.org:8545/'));
      } catch (error) {
        console.error(error);
      }

      contract = new initedWeb3.eth.Contract(
        JSON.parse('[{"inputs": [], "name": "gift", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, { "inputs": [{"internalType": "address", "name": "addr", "type": "address"}], "name": "getNumberGift", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}]'),
        contractAddress,
      );

      console.log(contract.methods);
    });

    const getProvider = detectEthereumProvider;

    const getAcc = async () => {
      const provider = await getProvider();

      if (provider) {
        init.value = provider.isMetaMask;
      } else {
        init.value = 'Please install MetaMask!';
      }

      [account.value] = await provider.request({ method: 'eth_requestAccounts' });
    };

    const checkGift = async () => {
      const provider = await getProvider();

      const data2 = contract.methods.getNumberGift(account.value).encodeABI();
      console.log('data2', data2);

      const params2 = [
        {
        // from: account.value,
          to: '0x398896F15B98CD281a6A11ec73872A7447Bb1559',
          // gas: '0x76c0', // 30400
          // gasPrice: '0x9184e72a000', // 10000000000000
          // value: '0x9184e72a', // 2441406250
          data: data2,
        },
      ];

      provider
        .request({
          method: 'eth_call',
          params: params2,
        }).then((result) => {
          currentGift.value = result;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const sendGift = async () => {
      const provider = await getProvider();
      const data = contract.methods.gift().encodeABI();
      const params = [
        {
          from: account.value,
          to: '0x398896F15B98CD281a6A11ec73872A7447Bb1559',
          // gas: '0x76c0', // 30400
          // gasPrice: '0x9184e72a000', // 10000000000000
          // value: '0x9184e72a', // 2441406250
          data,
        },
      ];

      getGiftLoading.value = true;

      provider
        .request({
          method: 'eth_sendTransaction',
          params,
        })
        .then((result) => {
          getGiftLoading.value = false;
          console.log('send:', result);
        })
        .catch((error) => {
          getGiftLoading.value = false;
          console.log(error);
        });
    };

    return {
      init,
      account,
      currentGift,
      getGiftLoading,
      getAcc,
      sendGift,
      checkGift,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
