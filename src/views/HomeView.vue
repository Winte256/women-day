<template>
  <div class="home">
    <div class="titleWrap">
      <!-- <base-icon-svg :width="84" :height="84" viewBox="0 0 84 84">
        <heart-icon/>
      </base-icon-svg> -->
      <the-title class="home__title">
        Искренне поздравляем
        <template v-slot:yellow> с Международным женским днём </template>
      </the-title>
    </div>
    <p class="home__text text">
      Специально к этому празднику мы выпустили коллекцию NFT “Цветы мира”<br />Мы
      дарим их Вам.
    </p>

    <div class="sliderItemsBox">
      <div class="sliderItemsWrap">
        <sliderItems />
      </div>
    </div>

    <p class="home__text text">
      Нажмите на кнопку Получить NFT <br />
      и Вам выпадет один из уникальных <br />
      цветков коллекции
    </p>

    <div class="home__buttonsBox buttonsBox">
      <common-button :hasBackground="true" @click="getNFT">{{
        loading ? "Загрузка" : "Получить NFT"
      }}</common-button>
    </div>
    <p class="home__policies policies">
      Нажмимая на кнопку, вы даете согласие <br />
      на обработку персональных данных и <br />
      соглашаетесь
      <a
        class="policiesLink"
        href="https://oton.org/media/PRIVACY_NOTICE.pdf?b6f7ac2c"
        target="_blank"
        rel="noopener noreferrer"
        >с политикой конфиденциальности
      </a>
      <br />
      <br />
      Для получения NFT вам надо будет авторизовать кошелёк и оплатить комиссию
      за транзакцию получения NFT со смарт-контракта. Комиссия составит не
      больше 10-15 центов.
      <br />
      <br />
      После выполнения транзакции, надо будет добавить NFT в кошелёк вручную.
      Инструкция будет на следующием шаге.
    </p>

    <contacts-box />
  </div>
</template>

<script>
import TheTitle from '@/components/TheTitle.vue';
import CommonButton from '@/components/CommonButton.vue';
// import BaseIconSvg from '@/components/BaseIconSvg.vue';
// import HeartIcon from '@/components/SvgIcons/HeartIcon.vue';
import ContactsBox from '@/components/ContactsBox.vue';
import SliderItems from '@/components/SliderItems.vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import {
  sendGift, checkGift, getAwaitNFTCookie, setAwaitNFTCookie,
} from '../utils/metamask';

export default {
  name: 'HomeView',
  components: {
    TheTitle,
    CommonButton,
    // BaseIconSvg,
    // HeartIcon,
    ContactsBox,
    SliderItems,
  },

  setup() {
    const loading = ref(false);
    const toast = useToast();
    const router = useRouter();

    const goToNFTPage = () => {
      loading.value = false;
      toast('NFT уже получена');
      setAwaitNFTCookie(1);
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

      setAwaitNFTCookie(1);
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

  &__title {
    margin-bottom: 16px;
  }

  &__text {
    margin-bottom: 24px;

    &:nth-of-type(2) {
      margin-bottom: 32px;
    }
  }

  &__buttonsBox {
    margin-bottom: 8px;
  }
}

.text {
  max-width: $width.phoneXs.buttonText;
  getFontText();
  text-align: center;

  +mediaPhoneS() {
    min-width: $width.phoneS.buttonText;
  }
}

.policies {
  margin-bottom: 56px;
  text-align: center;
  max-width: 300px;
  getFontPolicies();
}

.policiesLink {
  color: $colorAccent;

  &:hover {
    color: $colorAccent;
    opacity: 0.6;
  }
}

.buttonsBox {
  display: grid;
  grid-row-gap: 16px;
}

.sliderItemsBox {
  margin-bottom: 24px;
  width: 100%;
  max-width: 320px;
  overflow-y: auto;
  padding-bottom: 15px;
  scrollbar-width: thin;
  scrollbar-color: $colorAccent #fff;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $colorAccent;
    border: 2px solid $colorAccent;
    border-radius: 6px;
  }
}

.sliderItemsWrap {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
}
</style>
