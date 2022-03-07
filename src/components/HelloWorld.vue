<template>
  <div class="hello">
    {{ test }}
    <button @click="firstOnClick">test1</button>
    <button @click="secondOnClick">test2</button>
    <button @click="thirdOnClick">test3</button>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import detectEthereumProvider from '@metamask/detect-provider';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup() {
    const test = ref(0);
    const handleEthereum = () => {
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) {
        console.log('Ethereum successfully detected!');
        // Access the decentralized web!
      } else {
        console.log('Please install MetaMask!');
      }
    };
    if (window.ethereum) {
      handleEthereum();
    } else {
      window.addEventListener('ethereum#initialized', handleEthereum, {
        once: true,
      });

      // If the event is not dispatched by the end of the timeout,
      // the user probably doesn't have MetaMask installed.
      setTimeout(handleEthereum, 3000); // 3 seconds
    }

    const firstOnClick = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        // From now on, this should always be true:
        // provider === window.ethereum
        console.info(provider); // initialize your app
      } else {
        console.log('Please install MetaMask!');
      }
    };
    const secondOnClick = (e) => {
      e.preventDefault();
    };
    const thirdOnClick = (e) => {
      e.preventDefault();
      test.value += 1;
    };

    return {
      test,
      firstOnClick,
      secondOnClick,
      thirdOnClick,
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
