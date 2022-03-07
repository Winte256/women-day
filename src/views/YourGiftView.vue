<template>
  <div class="yourGift">
    <div v-if="awaitGift">loading...</div>

    <the-title class="home__title"> Ваш подарок </the-title>
    <div class="imageBox">
      <img
        class="image"
        :src="`https://oton.org/nft/drop_8_march/gift${giftN}.gif?123`"
        alt="nft flower"
      />
    </div>
    <div class="yourGift__buttonsBox buttonsBox">
      <common-button :hasBackground="true">Добавить в Metamask</common-button>
      <common-button :isBordered="true" @click="howToAttach"
        >Как привязать кошелек</common-button
      >
    </div>
    <contacts-box />
  </div>
</template>

<script>
import TheTitle from '@/components/TheTitle.vue';
import CommonButton from '@/components/CommonButton.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ContactsBox from '@/components/ContactsBox.vue';
import { setAwaitNFTCookie, getAwaitNFTCookie, checkGift } from '../utils/metamask';

export default {
  name: 'HomeView',
  components: {
    TheTitle,
    CommonButton,
    ContactsBox,
  },

  setup() {
    const router = useRouter();

    const awaitGift = ref(true);

    const giftN = ref('0');

    const checkAwait = async () => {
      const awaitStatus = getAwaitNFTCookie();

      if (awaitStatus === '0') {
        awaitGift.value = false;
        return;
      }

      const currentGift = await checkGift();
      if (currentGift === '0') {
        setTimeout(checkAwait, 500);
        return;
      }

      setAwaitNFTCookie(0);
      giftN.value = currentGift;
      awaitGift.value = false;
    };

    onMounted(async () => {
      const awaitStatus = getAwaitNFTCookie();

      if (awaitStatus === '1') {
        checkAwait();
        return;
      }

      const currentGift = await checkGift();

      if (!currentGift || currentGift === '0') {
        awaitGift.value = false;
        router.push('/');
        return;
      }

      if (currentGift !== '0') {
        awaitGift.value = false;
        giftN.value = currentGift;
      }
    });

    return {
      awaitGift,
      giftN,
    };
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

  &__buttonsBox {
    margin-bottom: 88px;
  }
}

.imageBox {
  margin-bottom: 32px;
  max-width: $width.phoneXs.buttonText;
  height: 420px;
  background: rgba(3, 1, 6, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.31);
  border-radius: 8px;

  +mediaPhoneS() {
    min-width: $width.phoneS.buttonText;
  }
}

.image {
  display: block;
  width: 100%;
  height: 100%;
}

.buttonsBox {
  display: grid;
  grid-row-gap: 16px;
}

.giftImg {
  max-width: 320px;
  width: 100%;
}
</style>
