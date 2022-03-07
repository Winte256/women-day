<template>
  <div class="yourGift">
    <the-title class="home__title"> Ваш подарок </the-title>
    <div class="buttonsBox">
      <common-button :hasBackground="true">Добавить в Metamask</common-button>
      <common-button :isBordered="true">Как привязать кошелек</common-button>
    </div>
    <contacts-box />
  </div>
</template>

<script>
import TheTitle from '@/components/TheTitle.vue';
import CommonButton from '@/components/CommonButton.vue';
import ContactsBox from '@/components/ContactsBox.vue';

export default {
  name: 'HomeView',
  components: {
    TheTitle,
    CommonButton,
    ContactsBox,
  },
};
</script>

<style lang="stylus">
.yourGift {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    margin-bottom: 16px;
  }
}

.buttonsBox {
  display: grid;
  grid-row-gap: 16px;
}
</style>
