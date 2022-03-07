<template>
  <div class="home">
    <common-button :hasBackground="true">Получить NFT </common-button>
    <common-button :hasBackground="true">Добавить в Metamask</common-button>
    <common-button :isBordered="true">Описание кошелька NFT</common-button>
    <common-button :isBordered="true">Как привязать кошелек</common-button>
  </div>
</template>

<script>
import CommonButton from '@/components/CommonButton.vue';

export default {
  name: 'HomeView',
  components: {
    CommonButton,
  },
};
</script>

<style lang="stylus">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
