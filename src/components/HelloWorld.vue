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
    const test = ref('');

    const firstOnClick = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        // From now on, this should always be true:
        // provider === window.ethereum
        test.value = provider.isMetaMask;
      } else {
        test.value = 'Please install MetaMask!';
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
