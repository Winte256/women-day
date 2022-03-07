<template>
  <div class="home">
    <common-button :hasBackground="true" @click="getNFT">
      {{ loading ? "Загрузка" : "Получить NFT" }}
    </common-button>
    <common-button :hasBackground="true">Добавить в Metamask</common-button>
    <common-button :isBordered="true">Описание кошелька NFT</common-button>
    <common-button :isBordered="true">Как привязать кошелек</common-button>
  </div>
</template>

<script>
import CommonButton from '@/components/CommonButton.vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import {
  sendGift, checkGift, getAwaitNFTCookie, setAwaitNFTCookie,
} from '../utils/metamask';

export default {
  name: 'HomeView',
  components: {
    CommonButton,
  },

  setup() {
    const loading = ref(false);
    const toast = useToast();
    const router = useRouter();

    const goToNFTPage = () => {
      loading.value = false;
      toast('NFT уже получена');
      router.push('/your-gift');
    };
    const onError = (text = 'Что то пошло не так') => {
      loading.value = false;
      toast.error(text);
    };

    const getNFT = async () => {
      if (loading.value) {
        return;
      }

      const gifted = getAwaitNFTCookie();
      loading.value = true;

      if (gifted === '1') {
        goToNFTPage();
        return;
      }

      const currentGift = await checkGift();

      if (!currentGift) {
        loading.value = false;
        return;
      }

      if (currentGift !== '0') {
        goToNFTPage();
        return;
      }

      try {
        await sendGift();
      } catch (error) {
        console.error(error);
        onError('Неизвестная Ошибка при получении NFT');
        return;
      }

      loading.value = false;

      setAwaitNFTCookie();
      router.push('/your-gift');
    };

    return {
      loading,

      getNFT,
    };
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
